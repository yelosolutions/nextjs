/**
 * getSortedPosts - utility function that reads the file system
 * note: lib folder does not have an assigned name like the pages folder
 *  - one is allowed to name it anything, usually lib or utils 
 */

import fs from 'fs'; // Node.js module that allow read of files from the file system.
import path from 'path'; // ..."" allow manipulation of file paths.
import matter from 'gray-matter'; // library that let's you parse the metadata in each markdown file.
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

//returns a list of objects with params key and a object with id key and md filename as value
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirPath);
    return fileNames.map((filename) => {
        return {
            params:{id: filename.replace(/\.md$/, '')},
        };
    });
}

//fetch data from file system based on id 
export function getPostData(id) {
    //md file path
    const fullPath = path.join(postsDirPath, `${id}.md`);

    //read file content
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    
    //parse data
    const matterResult =  matter(fileContent);

    return { id, ...matterResult.data};
}