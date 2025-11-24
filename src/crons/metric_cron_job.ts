import cron from 'node-cron';
import { ProjectRepository } from '../repositories/project_repo';
import { addJobsToQueue, projectQueue} from '../queue/queue';
import { APP_CONFIGS } from '../common/config';




export async function ProjectJob () {
    
    cron.schedule('* * * * *', async () => {

        const projectRepo = new ProjectRepository();
        const projects = await projectRepo.findManyByConditions({})

        if(!projects) return;

        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            addJobsToQueue(projectQueue, APP_CONFIGS.JOB_NAME, project);
            console.log('got added to Queue')
        }
    console.log('running a task every minute');
});
}