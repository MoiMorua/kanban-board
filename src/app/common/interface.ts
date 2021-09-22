export default interface Task {
    uuid:string,
    name:any,
    stage:number,
    stageName:string,
    previous?:string
};

export const STAGES = ['backlog','todo','ongoing','done'];