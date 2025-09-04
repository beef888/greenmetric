/*
  # Initial Schema Setup for GreenMetric.my

  1. New Tables
    - `companies`
      - `id` (uuid, primary key)
      - `name` (text)
      - `industry` (text)
      - `size` (text)
      - `state` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `company_id` (uuid, references companies)
      - `role` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `carbon_calculations`
      - `id` (uuid, primary key)
      - `company_id` (uuid, references companies)
      - `user_id` (uuid, references auth.users)
      - `scope1_emissions` (decimal)
      - `scope2_emissions` (decimal)
      - `scope3_emissions` (decimal)
      - `total_emissions` (decimal)
      - `calculation_data` (jsonb)
      - `created_at` (timestamp)
    
    - `esg_assessments`
      - `id` (uuid, primary key)
      - `company_id` (uuid, references companies)
      - `user_id` (uuid, references auth.users)
      - `environmental_score` (decimal)
      - `social_score` (decimal)
      - `governance_score` (decimal)
      - `overall_score` (decimal)
      - `responses` (jsonb)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  industry text,
  size text,
  state text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own company data"
  ON companies
  FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT company_id FROM profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can update own company data"
  ON companies
  FOR UPDATE
  TO authenticated
  USING (
    id IN (
      SELECT company_id FROM profiles WHERE id = auth.uid()
    )
  );

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  company_id uuid REFERENCES companies(id),
  role text DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Carbon calculations table
CREATE TABLE IF NOT EXISTS carbon_calculations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  scope1_emissions decimal(10,2) DEFAULT 0,
  scope2_emissions decimal(10,2) DEFAULT 0,
  scope3_emissions decimal(10,2) DEFAULT 0,
  total_emissions decimal(10,2) DEFAULT 0,
  calculation_data jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE carbon_calculations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own calculations"
  ON carbon_calculations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own calculations"
  ON carbon_calculations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own calculations"
  ON carbon_calculations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- ESG assessments table
CREATE TABLE IF NOT EXISTS esg_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  environmental_score decimal(5,2) DEFAULT 0,
  social_score decimal(5,2) DEFAULT 0,
  governance_score decimal(5,2) DEFAULT 0,
  overall_score decimal(5,2) DEFAULT 0,
  responses jsonb,
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE esg_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own assessments"
  ON esg_assessments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessments"
  ON esg_assessments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assessments"
  ON esg_assessments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to handle user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  company_id uuid;
BEGIN
  -- Create company if provided
  IF NEW.raw_user_meta_data->>'company_name' IS NOT NULL THEN
    INSERT INTO companies (name, industry, size)
    VALUES (
      NEW.raw_user_meta_data->>'company_name',
      NEW.raw_user_meta_data->>'industry',
      NEW.raw_user_meta_data->>'company_size'
    )
    RETURNING id INTO company_id;
  END IF;

  -- Create profile
  INSERT INTO profiles (id, email, full_name, company_id)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    company_id
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_esg_assessments_updated_at
  BEFORE UPDATE ON esg_assessments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();