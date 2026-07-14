/*
# Create bolt_new user profile table

1. Purpose
   Stores each signed-up user's onboarding data (Name, WhatsApp Number,
   Business Page Link) plus the account creation timestamp used to enforce
   a strict 3-day (72-hour) free trial.

2. New Table: bolt_new (public schema)
   - id            uuid PRIMARY KEY (default gen_random_uuid)
   - user_id       uuid NOT NULL, FK -> auth.users(id) ON DELETE CASCADE,
                   DEFAULT auth.uid() so client inserts omitting user_id succeed
   - name          text NOT NULL
   - whatsapp      text NOT NULL
   - page_link     text NOT NULL
   - created_at    timestamptz NOT NULL DEFAULT now()
                   (used for trial expiry calculation)

   NOTE: The requested table name was "bolt.new" and column "page-link".
   PostgreSQL identifiers containing dots are interpreted by PostgREST
   (the Supabase REST API) as schema.table separators, making them
   inaccessible via the JS client. We use "bolt_new" and "page_link"
   (underscores) instead so the REST API can read/write the table.

3. Security
   - RLS enabled on bolt_new.
   - Four owner-scoped policies (SELECT/INSERT/UPDATE/DELETE) restricted
     TO authenticated using auth.uid() = user_id.
*/

CREATE TABLE IF NOT EXISTS bolt_new (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  whatsapp text NOT NULL,
  page_link text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE bolt_new ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_bolt_new" ON bolt_new;
CREATE POLICY "select_own_bolt_new" ON bolt_new FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_bolt_new" ON bolt_new;
CREATE POLICY "insert_own_bolt_new" ON bolt_new FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_bolt_new" ON bolt_new;
CREATE POLICY "update_own_bolt_new" ON bolt_new FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_bolt_new" ON bolt_new;
CREATE POLICY "delete_own_bolt_new" ON bolt_new FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
