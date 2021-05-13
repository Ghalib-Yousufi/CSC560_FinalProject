import { Component, OnInit } from '@angular/core';
import { Project } from '../../../project/models/project';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  project: Project;
  Tasks: Task[];
  SortKey: string;

  constructor(private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  editTask(taskId: number) {
    this.taskService.getTask(taskId)
      .subscribe(response => {
        if (response.Success == true) {
          this.router.navigate(['/task/add'], { queryParams: { taskId: taskId } });
        }
        else {
        }
      });
  }

  endTask(taskId: number) {
    this.taskService.endTask(taskId)
      .subscribe(response => {
        if (response.Success == true) {
          this.refreshList();
        }
        else {
        }
      });
  }

  sortTask(sortKey: string) {
    this.SortKey = sortKey;
    this.taskService.getTasksList(this.project.Project_ID, sortKey)
      .subscribe(response => {
        if (response.Success == true) {
          this.Tasks = response.Data;
        }
        else {
        }
      });
  }

  refreshList() {
    //fetch all tasks associated to this project and display
    this.taskService.getTasksList(this.project.Project_ID, this.SortKey)
      .subscribe(response => {
        if (response.Success == true) {
          if (response.Data.length == 0) {
          }

          this.Tasks = response.Data;
          console.log(this.Tasks);
        }
        else {
        }
      });
  }


  //callback from Project search popup
  onProjectSelected(project: Project) {
    this.project = project;
    this.refreshList();
  }

}


