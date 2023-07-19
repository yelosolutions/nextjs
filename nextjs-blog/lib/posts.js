/**
 * getSortedPosts - utility function that reads the file system
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cwd } from 'process';

//get path of 'posts' directory with markdown files that represent blogs(file system)
const postsDirPath = path.join(cwd(), 'posts');

export function getSortedPosts() {
    //read posts directory path
    const fileNames = fs.readdirSync(postsDirPath);

    //get data from each md files 
    const allPosts = fileNames.map((filename) => {
        // remove '.md' from file name to create id as filename(using replace and regex)
        const id = filename.replace(/\.md$/, '');

        //get full md file path
        const fullPath = path.join(postsDirPath, filename);
        
        //read markdown file as string
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        //use gray-matter to parse the post metadata section(title and date)
        const matterResults = matter( fileContents);

        //combine the data with the id - return id and ...metadata
        return {id, ...matterResults.data};
    });

    //sort posts by date
    return (
        allPosts.sort((a, b) =>{
            if (a.date < b.date){
                return 1;
            } else {
                return -1;
            }
        })
    );
}