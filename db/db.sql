

--CREATE TABLE comments 
--(
--    comment_id SERIAL PRIMARY KEY
--    , comment_text VARCHAR(500) NOT NULL
--)
--
--CREATE TABLE video
--(
--      video_id SERIAL PRIMARY KEY
--    , video_name VARCHAR(24) NOT NULL
--    , is_liked BOOLEAN NOT NULL
--)
--
--CREATE TABLE liked_video
--(
--    liked_video_id SERIAL PRIMARY KEY
--    , 
--)

CREATE TABLE users_ 
(
     user_id SERIAL PRIMARY KEY
    , username VARCHAR(24) NOT NULL
    , pw VARCHAR(40) NOT NULL
    , prefered_name VARCHAR(24) NOT NULL
    , comments SERIAL 
    , liked_videos SERIAL 
);


INSERT INTO users_ (username,pw,prefered_name,comments,liked_videos) VALUES ('bubba', 'password', 'Yaboi-skie',1,2);

