import { Component, OnInit, HostListener } from '@angular/core';
import { JobService } from './job-service.service';
import { Job } from './job.interface';

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.css']
})
export class JobPageComponent implements OnInit {

  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  limit = 10;
  offset = 0;
  totalCount = 0;
  loading = false;
  showFullDescription: boolean[] = [];
  experienceOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1); // Array [1, 2, 3, ..., 10]

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.loadJobs();
  }



  loadJobs(): void {
    if (this.jobs.length < this.totalCount || this.totalCount === 0) {
      this.loading = true;
      setTimeout(() => {
        this.jobService.getJobs(this.limit, this.offset).subscribe(
          (response) => {
            this.jobs = this.jobs.concat(response.jdList);
            this.totalCount = response.totalCount;
            this.offset += this.limit;
            this.filteredJobs = this.jobs;
            this.loading = false;
            this.showFullDescription = Array(this.jobs.length).fill(false);
          },
          (error) => {
            console.error(error);
            this.loading = false;
          }
        );
      }, 1000);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= (docHeight - 50) && !this.loading) {
      this.loadJobs();
    }
  }

  toggleDescription(index: number): void {
    this.showFullDescription[index] = !this.showFullDescription[index];
  }

  // Appling filter based on company name
  applyCompanyFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.value) {
      const filterValue = inputElement.value.toLowerCase().trim();
      this.filteredJobs = this.jobs.filter(job => job.companyName.toLowerCase().includes(filterValue));
    }
  }

  // Appling filter based on minimum experience
  applyExperienceFilter(selectedExperience: any): void {
    if (selectedExperience === '') {
      this.filteredJobs = this.jobs; // Reset to all jobs if no experience is selected
    } else {
      const minExp = parseInt(selectedExperience, 10);
      this.filteredJobs = this.jobs.filter(job => job.minExp !== undefined && job.minExp >= minExp);
    }
  }

   // Appling filter based on location input
   applyLocationFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.value) {
      const filterValue = inputElement.value.toLowerCase().trim();
      this.filteredJobs = this.jobs.filter(job => job.location.toLowerCase().includes(filterValue));
    }
  }


  // Appling filter based on location
  applyLocationFilters(selectedLocation: string): void {
    if (selectedLocation === '') {
      this.filteredJobs = this.jobs; // Reset to all jobs if no location is selected
    } else if (selectedLocation === 'Remote') {
      this.filteredJobs = this.jobs.filter(job => job.location.toLowerCase() === 'remote');
    } else if (selectedLocation === 'On-Site') {
      this.filteredJobs = this.jobs.filter(job => job.location.toLowerCase() !== 'remote');
    }
  }

   // Appling filter based on role name
   applyRoleFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.value) {
      const filterValue = inputElement.value.toLowerCase().trim();
      this.filteredJobs = this.jobs.filter(job => job.jobRole.toLowerCase().includes(filterValue));
    }
  }

   // Appling filter based on minimum base pay
   applyMinBasePayFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.value) {
      const minBasePay = parseFloat(inputElement.value.trim());
      this.filteredJobs = this.jobs.filter(job => job.minJdSalary !== undefined && job.minJdSalary >= minBasePay);
    }
  }
}
