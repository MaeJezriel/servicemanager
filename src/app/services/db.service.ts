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
        name: 'sample.db',
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
            location_name: res.rows.item(i).location_name,  
            tasks_name: res.rows.item(i).tasks_name,
            time_name: res.rows.item(i).time_name,
           });
        }
      }
      this.songsList.next(items);
    });
  }
  // Add
  addSong(artist_name, song_name, sample_name) {
    let data = [artist_name, song_name, sample_name];
    return this.storage.executeSql('INSERT INTO jobtable ( location_name, tasks_name, time_name) VALUES (?, ?, ?)', data)
    .then(res => {
      this.getSongs();
    });
  }
 
  // Get single object
  getSong(id): Promise<Job> {
    return this.storage.executeSql('SELECT * FROM jobtable WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        location_name: res.rows.item(0). location_name,  
        tasks_name: res.rows.item(0).tasks_name,
        time_name: res.rows.item(0).time_name,
      }
    });
  }
  // Update
  updateSong(id, song: Job) {
    let data = [song.location_name, song.tasks_name,  song.time_name ];
    return this.storage.executeSql(`UPDATE jobtable SET location_name = ?, tasks_name = ?, time_name = ? WHERE id = ${id}`, data)
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