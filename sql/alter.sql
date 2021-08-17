-- psql –f setup.sql –d chitchat
-- psql -U gwp -d gwp -c "TRUNCATE public.posts RESTART IDENTITY CASCADE;" 

ALTER TABLE IF EXISTS help DROP CONSTRAINT help_email_key;

ALTER TABLE feedbacks ADD CONSTRAINT feedbacks_user_uuid_fkey 
 FOREIGN KEY (user_uuid) REFERENCES users (uuid) MATCH FULL;