import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Job } from './job';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  private storage: SQLiteObject;
  jobsList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'test2.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }
  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchJobs(): Observable<Job[]> {
    return this.jobsList.asObservable();
  }
    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/dump.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getJobs();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }
  // Get list
  getJobs(){
    return this.storage.executeSql('SELECT * FROM jobtable', []).then(res => {
      let items: Job[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            service_request: res.rows.item(i).service_request,  
            location_name: res.rows.item(i).location_name,  
            tasks_name: res.rows.item(i).tasks_name,
            time_name: res.rows.item(i).time_name,
            site_equipment: res.rows.item(i).site_equipment,
            problem_name: res.rows.item(i).problem_name,
            action_name: res.rows.item(i).action_name,
            recommended_name: res.rows.item(i).recommended_name,
            fault_code: res.rows.item(i).fault_code,
            customer_name: res.rows.item(i).customer_name,
            position_name: res.rows.item(i).position_name
           });
        }
      }
      this.jobsList.next(items);
    });
  }
  // Add
  addJob(location_name, tasks_name,time_name, site_equipment, problem_name, action_name, recommended_name, fault_code) {
    let data = [location_name, tasks_name, time_name, site_equipment, problem_name, action_name, recommended_name, fault_code];
    return this.storage.executeSql('INSERT INTO jobtable (location_name, tasks_name, time_name, site_equipment, problem_name, action_name, recommended_name, fault_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', data)
    .then(res => {
      this.getJobs();
    });
  }
 
  // Get single object
  getJob(id): Promise<Job> {
    return this.storage.executeSql('SELECT * FROM jobtable WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        service_request: res.rows.item(0). service_request,  
        location_name: res.rows.item(0). location_name,  
        tasks_name: res.rows.item(0).tasks_name,
        time_name: res.rows.item(0).time_name,
        site_equipment: res.rows.item(0).site_equipment,
        problem_name: res.rows.item(0).problem_name,
        action_name: res.rows.item(0).action_name,
        recommended_name: res.rows.item(0).recommended_name,
        fault_code: res.rows.item(0).fault_code,
        customer_name: res.rows.item(0).customer_name,
        position_name: res.rows.item(0).position_name
      }
    });
  }
  // Update
  updateJob(id, job: Job) {
    let data = [job.site_equipment, job.location_name, job.service_request, job.problem_name, job.action_name, job.recommended_name, job.fault_code, job.customer_name, job.position_name];
    return this.storage.executeSql(`UPDATE jobtable SET site_equipment = ?, location_name = ?, service_request = ?, problem_name = ?, action_name = ?, recommended_name = ?, fault_code = ?, customer_name = ?, position_name = ? WHERE id = ${id}`, data)
    .then(data => {
      this.getJobs();
    })
  }
  // Delete
  deleteJob(id) {
    return this.storage.executeSql('DELETE FROM jobtable WHERE id = ?', [id])
    .then(_ => {
      this.getJobs();
    });
  }
}