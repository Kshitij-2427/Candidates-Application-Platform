import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Job } from './job.interface';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'https://api.weekday.technology/adhoc/getSampleJdJSON';

  constructor(private http: HttpClient) {}

  getJobs(
    limit: number,
    offset: number
  ): Observable<{ jdList: Job[]; totalCount: number }> {
    const body = { limit, offset };

    return this.http.post<{ jdList: Job[]; totalCount: number }>(
      this.apiUrl,
      body
    );
  }
}
