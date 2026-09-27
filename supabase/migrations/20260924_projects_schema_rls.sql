-- ==============================================================================
-- MIGRATION: Schema Tabel Projects & Row Level Security (RLS)
-- Jalankan skrip ini di: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. PEMBUATAN / PEMBARUAN STRUKTUR TABEL
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_path TEXT DEFAULT '/project1.png',
  image TEXT DEFAULT '/project1.png',
  website_url TEXT DEFAULT '',
  demo_url TEXT DEFAULT '',
  tech_stack TEXT[] DEFAULT '{}',
  github_url TEXT DEFAULT '',
  is_published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Memastikan kolom kompatibilitas tersedia jika tabel sudah pernah dibuat sebelumnya
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS image TEXT DEFAULT '/project1.png';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS image_path TEXT DEFAULT '/project1.png';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS website_url TEXT DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS demo_url TEXT DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS tech_stack TEXT[] DEFAULT '{}';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS github_url TEXT DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now());
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now());

-- ------------------------------------------------------------------------------
-- 2. MENGAKTIFKAN ROW LEVEL SECURITY (RLS)
-- ------------------------------------------------------------------------------
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 3. POLICIES KEAMANAN (RLS POLICIES)
-- ------------------------------------------------------------------------------
-- Bersihkan policy lama jika ada untuk mencegah error duplikasi
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can view all projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can update projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can delete projects" ON public.projects;

-- Policy 1: Pengunjung publik (anon) dan authenticated dapat membaca project yang di-publish
-- Pengguna authenticated (Admin) dapat melihat semua project (termasuk draft/unpublish)
CREATE POLICY "Public can view published projects"
ON public.projects
FOR SELECT
TO public
USING (is_published = true OR auth.role() = 'authenticated');

-- Policy 2: Hanya akun terautentikasi (Admin) yang dapat menambah project
CREATE POLICY "Admins can insert projects"
ON public.projects
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy 3: Hanya akun terautentikasi (Admin) yang dapat memperbarui project
CREATE POLICY "Admins can update projects"
ON public.projects
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy 4: Hanya akun terautentikasi (Admin) yang dapat menghapus project
CREATE POLICY "Admins can delete projects"
ON public.projects
FOR DELETE
TO authenticated
USING (true);

-- ------------------------------------------------------------------------------
-- 4. SQL TAMBAHAN: FUNGSI TRIGGER SINKRONISASI OTOMATIS
-- ------------------------------------------------------------------------------
-- Trigger ini memastikan field image <-> image_path dan demo_url <-> website_url
-- selalu sinkron secara otomatis baik saat query lama maupun baru dijalankan.
CREATE OR REPLACE FUNCTION sync_project_compat_fields()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.image IS NOT NULL AND (NEW.image_path IS NULL OR NEW.image_path = '') THEN
    NEW.image_path := NEW.image;
  ELSIF NEW.image_path IS NOT NULL AND (NEW.image IS NULL OR NEW.image = '') THEN
    NEW.image := NEW.image_path;
  END IF;

  IF NEW.demo_url IS NOT NULL AND (NEW.website_url IS NULL OR NEW.website_url = '') THEN
    NEW.website_url := NEW.demo_url;
  ELSIF NEW.website_url IS NOT NULL AND (NEW.demo_url IS NULL OR NEW.demo_url = '') THEN
    NEW.demo_url := NEW.website_url;
  END IF;

  NEW.updated_at := timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_project_compat_fields ON public.projects;
CREATE TRIGGER trg_sync_project_compat_fields
BEFORE INSERT OR UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION sync_project_compat_fields();
