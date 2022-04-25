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
  songsList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'exe2.db',
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

  fetchSongs(): Observable<Job[]> {
    return this.songsList.asObservable();
  }
    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/dump.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getSongs();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }
  // Get list
  getSongs(){
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
            recommended_name: res.rows.item(i).recommended_name
           });
        }
      }
      this.songsList.next(items);
    });
  }
  // Add
  addSong(location_name, tasks_name,time_name, site_equipment, problem_name, action_name, recommended_name) {
    let data = [location_name, tasks_name, time_name, site_equipment, problem_name, action_name, recommended_name];
    return this.storage.executeSql('INSERT INTO jobtable (location_name, tasks_name, time_name, site_equipment, problem_name, action_name, recommended_name) VALUES (?, ?, ?, ?, ?, ?, ?)', data)
    .then(res => {
      this.getSongs();
    });
  }
 
  // Get single object
  getSong(id): Promise<Job> {
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
        recommended_name: res.rows.item(0).recommended_name
      }
    });
  }
  // Update
  updateSong(id, song: Job) {
    let data = [song.site_equipment, song.location_name, song.service_request, song.problem_name, song.action_name, song.recommended_name];
    return this.storage.executeSql(`UPDATE jobtable SET site_equipment = ?, location_name = ?, service_request = ?, problem_name = ?, action_name = ?, recommended_name = ? WHERE id = ${id}`, data)
    .then(data => {
      this.getSongs();
    })
  }
  // Delete
  deleteSong(id) {
    return this.storage.executeSql('DELETE FROM jobtable WHERE id = ?', [id])
    .then(_ => {
      this.getSongs();
    });
  }
}