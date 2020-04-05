#!/bin/bash
read -p "Title of the video: " title
read -p "Description of the video: " description
read -p "YouTube Id: " ytid
read -p "Published date : " pdate
echo  '{ "title": "'$title'",' >> ./data/$ytid.json
echo  '"description": "'$description'",' >> ./data/$ytid.json
echo  '"publishedAt": "'$pdate'",' >> ./data/$ytid.json
echo  '"vid_src": "'$ytid'"}' >> ./data/$ytid.json
quotedYtId='"'$ytid'",'
gsed -i  -e "2i$quotedYtId" ./data/home.json
