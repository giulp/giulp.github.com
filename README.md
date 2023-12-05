# Vue3 Resume

An interactive, mobile-friendly resume app with Vue js inspired from [ng-resume](https://github.com/hazrmard/ng-Resume)
  
## What is Vue3 Resume ?

`Vue3 Resume` is a simple Vue js app that renders JSON content into a a responsive web page formatted like a resume/CV. It is lightweight and can be quickly changed to meet your needs.  

## Usage

The `json` folder is where the content of the resume, the titles and labels are stored and can be edited.  
For advanced setup, you can modify or create sections as components. 
Shared templates are stored in `components/_common`  

**You can see the app live in action [here](https://giulp.github.io).**  
  
## Testing locally
`cd` to the project directory and execute 
`npm run serve`

## Deploying to github pages
See [here](https://learnvue.co/articles/deploy-vue-to-github-pages) for a step-by-step guide to configure your repo.

1. Build your project using npm build
This step is pretty self explanatory, we actually need to have a dist folder to deploy.

2. Run git add dist && git commit -m 'adding dist subtree'
This commits our changes to the master branch so that we can create a dist subtree in the next step. Make sure that dist is not included in your .gitignorefile!

3. Run git subtree push --prefix dist origin gh-pages
This step makes gh-pages a subtree of our master branch. The prefix option specifies the folder that we want for our the subtree. If we take a look at our gh-pages branch, we will see that it is equivalent to being the root of the dist folder.
