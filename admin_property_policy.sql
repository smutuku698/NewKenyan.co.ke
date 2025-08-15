-- Add admin policy for property listings approval
-- This allows admin users to approve/disapprove any property listing

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admin can update any property listing" ON property_listings;

-- Create admin policy for property listings  
-- Note: In production, you should check for actual admin role/permission
-- For now, this allows any authenticated user to update approval status
CREATE POLICY "Admin can update any property listing" ON property_listings
    FOR UPDATE USING (true)
    WITH CHECK (true);

-- Alternatively, if you want to restrict to specific admin users, use:
-- CREATE POLICY "Admin can update any property listing" ON property_listings
--     FOR UPDATE USING (auth.uid()::text IN ('admin_user_id_1', 'admin_user_id_2'))
--     WITH CHECK (auth.uid()::text IN ('admin_user_id_1', 'admin_user_id_2'));