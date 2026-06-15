-- =====================================================
-- piece of cake — Supabase 스키마
-- Supabase 대시보드 SQL 에디터에서 실행하세요
-- =====================================================

-- 1. 프로필 테이블 (소셜 로그인 후 자동 생성)
create table if not exists public.profiles (
  id          uuid references auth.users on delete cascade primary key,
  display_name text,
  avatar_url   text,
  created_at   timestamptz default now()
);

-- 2. 수강 신청 테이블
create table if not exists public.enrollments (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users on delete cascade not null,
  class_id    text not null,
  enrolled_at timestamptz default now(),
  unique (user_id, class_id)
);

-- 3. RLS 활성화
alter table public.profiles    enable row level security;
alter table public.enrollments enable row level security;

-- 4. RLS 정책
create policy "본인 프로필 조회/수정" on public.profiles
  for all using (auth.uid() = id);

create policy "본인 수강 내역 조회/추가" on public.enrollments
  for all using (auth.uid() = user_id);

-- 5. 회원가입 시 프로필 자동 생성 트리거
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
