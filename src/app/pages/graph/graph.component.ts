import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  public lastTemperature1: any;
  public lastTemperatureTime1: any;

  public lastTemperature2: any;
  public lastTemperatureTime2: any;

//voltage: 
  public lastVoltage1:any;
  public lastVoltage2:any;
  public lastVoltage3:any;


  public lastVoltage1Time:any;
  public lastVoltage2Time:any;
  public lastVoltage3Time:any;

//smoke
  public smoke1:any;
  public lastSomek1Time:any;
  public smoke2:any;
  public lastSomek2Time:any;
  public smoke3:any;
  public lastSomek3Time:any;

  //liquid
  public liquid1:any;
  public lastLiquid1Time:any;
  public liquid2:any;
  public lastLiquid2Time:any;

  //humidity
    public humidity1:any;
    public lastHumidity1Time:any;
    public humidity2:any;
    public lastHumidity2Time:any;


    //frequency

    public frequency1:any;
    public lastFrequency1Time:any;
    public frequency2:any;
    public lastFrequency2Time:any;
    public frequency3:any;
    public lastFrequency3Time:any;

    //current



    public current1:any;
    public lastCurrent1Time:any;
    public current2:any;
    public lastCurrent2Time:any;
    public current3:any;
    public lastCurrent3Time:any;


  public lineChart1: any;
  public lineChart2: any;
  public lineChart3: any;
  public lineChart4: any;
  public lineChart5: any;
  public lineChart6: any;
  public lineChart7: any;
  public lineChart8: any;
  public lineChart9: any;
  public lineChart10: any;

  public lineChart11: any;
  public lineChart12: any;
  public lineChart13: any;
  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.listlMqtfLogs();
    this.createChart();
  }

  createChart() {

    this.lineChart1 = new Chart("MyChart", {
      type: "line", //this denotes tha type of chart


      data: {
        labels: [],
        datasets: [
          {
            label: "Temperature1",
            data: [],
            backgroundColor:
              "rgba(255, 99, 132, 0.2)",

            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        aspectRatio: 1.8,
        scales: {
          x: {
            //  type: 'linear',
            grace: '35%',

            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 4, // Maximum number of ticks to show
            },
          },
          y: {
            type: 'linear',
            grace: '20%',
            beginAtZero: false,
            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 3, // Maximum number of ticks to show
            },
          },
        },

        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });
    this.lineChart2 = new Chart("MyChart2", {
      type: "line", //this denotes tha type of chart

      data: {
        labels: [],
        datasets: [
          {

            label: "Temperature2",
            data: [],
            backgroundColor:
              "rgba(255, 99, 132, 0.2)",

            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        aspectRatio: 1.8,
        scales: {
          x: {
            //  type: 'linear',
            grace: '35%',

            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 4, // Maximum number of ticks to show
            },
          },
          y: {
            type: 'linear',
            grace: '20%',
            beginAtZero: false,
            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 3, // Maximum number of ticks to show
            },
          },
        },

        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });
    this.lineChart3 = new Chart("MyChart3", {
      type: "line", //this denotes tha type of chart

      data: {
        labels: [],
        datasets: [
          {

            label: "Voltage1",
            data: [],
            backgroundColor:
              "rgba(255, 99, 132, 0.2)",

            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        aspectRatio: 1.8,
        scales: {
          x: {
            //  type: 'linear',
            grace: '35%',

            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 4, // Maximum number of ticks to show
            },
          },
          y: {
            type: 'linear',
            grace: '20%',
            beginAtZero: false,
            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 3, // Maximum number of ticks to show
            },
          },
        },

        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });
    this.lineChart4 = new Chart("MyChart4", {
      type: "line", //this denotes tha type of chart

      data: {
        labels: [],
        datasets: [
          {

            label: "Voltage2",
            data: [],
            backgroundColor:
              "rgba(255, 99, 132, 0.2)",

            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        aspectRatio: 1.8,
        scales: {
          x: {
            //  type: 'linear',
            grace: '35%',

            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 4, // Maximum number of ticks to show
            },
          },
          y: {
            type: 'linear',
            grace: '20%',
            beginAtZero: false,
            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 3, // Maximum number of ticks to show
            },
          },
        },

        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });
    this.lineChart5 = new Chart("MyChart5", {
      type: "line", //this denotes tha type of chart

      data: {
        labels: [],
        datasets: [
          {

            label: "Voltage3",
            data: [],
            backgroundColor:
              "rgba(255, 99, 132, 0.2)",

            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        aspectRatio: 1.8,
        scales: {
          x: {
            //  type: 'linear',
            grace: '35%',

            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 4, // Maximum number of ticks to show
            },
          },
          y: {
            type: 'linear',
            grace: '20%',
            beginAtZero: false,
            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 3, // Maximum number of ticks to show
            },
          },
        },

        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });
    this.lineChart6 = new Chart("MyChart6", {
      type: "line", //this denotes tha type of chart

      data: {
        labels: [],
        datasets: [
          {

            label: "Humidity1",
            data: [],
            backgroundColor:
              "rgba(255, 99, 132, 0.2)",

            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        aspectRatio: 1.8,
        scales: {
          x: {
            //  type: 'linear',
            grace: '35%',

            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 4, // Maximum number of ticks to show
            },
          },
          y: {
            type: 'linear',
            grace: '20%',
            beginAtZero: false,
            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 3, // Maximum number of ticks to show
            },
          },
        },

        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });
    this.lineChart7 = new Chart("MyChart7", {
      type: "line", //this denotes tha type of chart

      data: {
        labels: [],
        datasets: [
          {

            label: "Humidity2",
            data: [],
            backgroundColor:
              "rgba(255, 99, 132, 0.2)",

            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        aspectRatio: 1.8,
        scales: {
          x: {
            //  type: 'linear',
            grace: '35%',

            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 4, // Maximum number of ticks to show
            },
          },
          y: {
            type: 'linear',
            grace: '20%',
            beginAtZero: false,
            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 3, // Maximum number of ticks to show
            },
          },
        },

        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });
    this.lineChart8 = new Chart("MyChart8", {
      type: "line", //this denotes tha type of chart

      data: {
        labels: [],
        datasets: [
          {

            label: "Frequency1",
            data: [],
            backgroundColor:
              "rgba(255, 99, 132, 0.2)",

            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        aspectRatio: 1.8,
        scales: {
          x: {
            //  type: 'linear',
            grace: '35%',

            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 4, // Maximum number of ticks to show
            },
          },
          y: {
            type: 'linear',
            grace: '20%',
            beginAtZero: false,
            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 3, // Maximum number of ticks to show
            },
          },
        },

        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });
    this.lineChart9 = new Chart("MyChart9", {
      type: "line", //this denotes tha type of chart

      data: {
        labels: [],
        datasets: [
          {

            label: "Frequency2",
            data: [],
            backgroundColor:
              "rgba(255, 99, 132, 0.2)",

            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        aspectRatio: 1.8,
        scales: {
          x: {
            //  type: 'linear',
            grace: '35%',

            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 4, // Maximum number of ticks to show
            },
          },
          y: {
            type: 'linear',
            grace: '20%',
            beginAtZero: false,
            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 3, // Maximum number of ticks to show
            },
          },
        },

        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });
    this.lineChart10 = new Chart("MyChart10", {
      type: "line", //this denotes tha type of chart

      data: {
        labels: [],
        datasets: [
          {

            label: "Frequency3",
            data: [],
            backgroundColor:
              "rgba(255, 99, 132, 0.2)",

            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        aspectRatio: 1.8,
        scales: {
          x: {
            //  type: 'linear',
            grace: '35%',

            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 4, // Maximum number of ticks to show
            },
          },
          y: {
            type: 'linear',
            grace: '20%',
            beginAtZero: false,
            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 3, // Maximum number of ticks to show
            },
          },
        },

        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });

    //current

    this.lineChart11 = new Chart("MyChart11", {
      type: "line", //this denotes tha type of chart

      data: {
        labels: [],
        datasets: [
          {

            label: "Current1",
            data: [],
            backgroundColor:
              "rgba(255, 99, 132, 0.2)",

            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        aspectRatio: 1.8,
        scales: {
          x: {
            //  type: 'linear',
            grace: '35%',

            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 4, // Maximum number of ticks to show
            },
          },
          y: {
            type: 'linear',
            grace: '20%',
            beginAtZero: false,
            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 3, // Maximum number of ticks to show
            },
          },
        },

        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });
    this.lineChart12 = new Chart("MyChart12", {
      type: "line", //this denotes tha type of chart

      data: {
        labels: [],
        datasets: [
          {

            label: "Current2",
            data: [],
            backgroundColor:
              "rgba(255, 99, 132, 0.2)",

            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        aspectRatio: 1.8,
        scales: {
          x: {
            //  type: 'linear',
            grace: '35%',

            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 4, // Maximum number of ticks to show
            },
          },
          y: {
            type: 'linear',
            grace: '20%',
            beginAtZero: false,
            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 3, // Maximum number of ticks to show
            },
          },
        },

        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });
    this.lineChart13 = new Chart("MyChart13", {
      type: "line", //this denotes tha type of chart

      data: {
        labels: [],
        datasets: [
          {

            label: "Current3",
            data: [],
            backgroundColor:
              "rgba(255, 99, 132, 0.2)",

            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        aspectRatio: 1.8,
        scales: {
          x: {
            //  type: 'linear',
            grace: '35%',

            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 4, // Maximum number of ticks to show
            },
          },
          y: {
            type: 'linear',
            grace: '20%',
            beginAtZero: false,
            ticks: {
              autoSkip: true, // Enable auto-skipping of labels
              maxTicksLimit: 3, // Maximum number of ticks to show
            },
          },
        },

        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });
  }


  listlMqtfLogs() {
    this.authService.getAllMqtfLogsWithoutPegi().subscribe({
      next: (res: any) => {
        console.log('list AllMqtfLogs', res.data);
        res['data'].forEach((item) => {
          const datePipe = new DatePipe('en-US');
          const formatedDate = datePipe.transform(item.createdAt, 'HH:mm:ss');
          if (item.sensorType == 't' &&
            item.sensorNumber == 0 &&
            new Date(item.createdAt).toDateString() === new Date().toDateString()) {
            this.lineChart1.data.labels.push(formatedDate);
            this.lineChart1.data.datasets[0].data.push(item.sensorValue);
          }
          else if (item.sensorType == 't'
           && item.sensorNumber == 1 
           &&  new Date(item.createdAt).toDateString() === new Date().toDateString()
           ) {
            console.log('item101', item);
            this.lineChart2.data.labels.push(formatedDate);
            this.lineChart2.data.datasets[0].data.push(item.sensorValue);
          }
          else if (item.sensorType == 'v' 
          && item.sensorNumber == 0
          && item.sensorValue !== -1
          &&  new Date(item.createdAt).toDateString() === new Date().toDateString()
          ) {
            console.log('item', item);
            this.lineChart3.data.labels.push(formatedDate);
            this.lineChart3.data.datasets[0].data.push(item.sensorValue);
          }
          else if (
            item.sensorType == 'v'
             && item.sensorNumber == 1
             && item.sensorValue !== -1
             &&  new Date(item.createdAt).toDateString() === new Date().toDateString()
             ) {
            console.log('item', item);
            this.lineChart4.data.labels.push(formatedDate);
            this.lineChart4.data.datasets[0].data.push(item.sensorValue);
          }
          else if (item.sensorType == 'v'
           && item.sensorNumber == 2
            && item.sensorValue !== -1
            &&  new Date(item.createdAt).toDateString() === new Date().toDateString()
            ) {
            console.log('item', item);
            this.lineChart5.data.labels.push(formatedDate);
            this.lineChart5.data.datasets[0].data.push(item.sensorValue);
          }

          else if (item.sensorType == 'h'
          && item.sensorNumber == 0
           && item.sensorValue !== -1
           &&  new Date(item.createdAt).toDateString() === new Date().toDateString()
           ) {
           console.log('item', item);
           this.lineChart6.data.labels.push(formatedDate);
           this.lineChart6.data.datasets[0].data.push(item.sensorValue);
         }
         else if (item.sensorType == 'h'
         && item.sensorNumber == 1
          && item.sensorValue !== -1
          &&  new Date(item.createdAt).toDateString() === new Date().toDateString()
          ) {
          console.log('item', item);
          this.lineChart7.data.labels.push(formatedDate);
          this.lineChart7.data.datasets[0].data.push(item.sensorValue);
        }

        else if (item.sensorType == 'f'
        && item.sensorNumber == 0
         && item.sensorValue !== -1
         &&  new Date(item.createdAt).toDateString() === new Date().toDateString()
         ) {
         console.log('item', item);
         this.lineChart8.data.labels.push(formatedDate);
         this.lineChart8.data.datasets[0].data.push(item.sensorValue);
       }

       else if (item.sensorType == 'f'
       && item.sensorNumber ==1
        && item.sensorValue !== -1
        &&  new Date(item.createdAt).toDateString() === new Date().toDateString()
        ) {
        console.log('item', item);
        this.lineChart9.data.labels.push(formatedDate);
        this.lineChart9.data.datasets[0].data.push(item.sensorValue);
      }

      else if (item.sensorType == 'f'
      && item.sensorNumber ==2
       && item.sensorValue !== -1
       &&  new Date(item.createdAt).toDateString() === new Date().toDateString()
       ) {
       console.log('item', item);
       this.lineChart10.data.labels.push(formatedDate);
       this.lineChart10.data.datasets[0].data.push(item.sensorValue);
     }
     //current
     else if (item.sensorType == 'i'
     && item.sensorNumber ==0
      && item.sensorValue !== -1
      &&  new Date(item.createdAt).toDateString() === new Date().toDateString()
      ) {
      console.log('item', item);
      this.lineChart11.data.labels.push(formatedDate);
      this.lineChart11.data.datasets[0].data.push(item.sensorValue);
    }
    else if (item.sensorType == 'i'
    && item.sensorNumber ==1
     && item.sensorValue !== -1
     &&  new Date(item.createdAt).toDateString() === new Date().toDateString()
     ) {
     console.log('item', item);
     this.lineChart12.data.labels.push(formatedDate);
     this.lineChart12.data.datasets[0].data.push(item.sensorValue);
   }

   else if (item.sensorType == 'i'
   && item.sensorNumber ==2
    && item.sensorValue !== -1
    &&  new Date(item.createdAt).toDateString() === new Date().toDateString()
    ) {
    console.log('item', item);
    this.lineChart13.data.labels.push(formatedDate);
    this.lineChart13.data.datasets[0].data.push(item.sensorValue);
  }




        });
        this.lineChart1.update();
        this.lineChart2.update();
        this.lineChart3.update();
        this.lineChart4.update();
        this.lineChart5.update();
        this.lineChart6.update();
        this.lineChart7.update();
        this.lineChart8.update();
        this.lineChart9.update();
        this.lineChart10.update();
        this.lineChart11.update();
        this.lineChart12.update();
        this.lineChart13.update();
        const filterTemp1 = res['data'].filter((item) => {
          return item.sensorType == 't' && item.sensorNumber == 0
        })
        const filterTemp2 = res['data'].filter((item) => {
          return item.sensorType == 't' && item.sensorNumber == 1
        })
        const voltage1 = res['data'].filter((item) => {
          return item.sensorType == 'v' && item.sensorNumber == 0
        })
        const voltage2 = res['data'].filter((item) => {
          return item.sensorType == 'v' && item.sensorNumber == 1
        })
        const voltage3 = res['data'].filter((item) => {
          return item.sensorType == 'v' && item.sensorNumber == 2
        })



        //Humidity

        const humidity1 = res['data'].filter((item) => {
          return item.sensorType == 'h' && item.sensorNumber == 0
        })
        const humidity2 = res['data'].filter((item) => {
          return item.sensorType == 'h' && item.sensorNumber == 1
        })

        const smoke1 = res['data'].filter((item) => {
          return item.sensorType == 's' && item.sensorNumber == 0
        })
        const smoke2 = res['data'].filter((item) => {
          return item.sensorType == 's' && item.sensorNumber == 1
        })
        const smoke3 = res['data'].filter((item) => {
          return item.sensorType == 's' && item.sensorNumber == 2
        })


//lequid
        const liquid1 = res['data'].filter((item) => {
          return item.sensorType == 'l' && item.sensorNumber == 0
        })
        const liquid2 = res['data'].filter((item) => {
          return item.sensorType == 'l' && item.sensorNumber == 1
        })

        //frequency

        const frequency1 = res['data'].filter((item) => {
          return item.sensorType == 'f' && item.sensorNumber == 0
        })
        const frequency2 = res['data'].filter((item) => {
          return item.sensorType == 'f' && item.sensorNumber == 1
        })
        const frequency3 = res['data'].filter((item) => {
          return item.sensorType == 'f' && item.sensorNumber == 2
        })


        //current

        const current1 = res['data'].filter((item) => {
          return item.sensorType == 'i' && item.sensorNumber == 0
        })
        const current2 = res['data'].filter((item) => {
          return item.sensorType == 'i' && item.sensorNumber == 1
        })
        const current3 = res['data'].filter((item) => {
          return item.sensorType == 'i' && item.sensorNumber == 2
        })

        this.lastTemperature1 = filterTemp1.length > 0 ? filterTemp1[filterTemp1.length - 1].sensorValue : null;
        this.lastTemperatureTime1 = filterTemp1.length > 0 ? filterTemp1[filterTemp1.length - 1].createdAt : null;

        this.lastTemperature2 = filterTemp2.length > 0 ? filterTemp2[filterTemp2.length - 1].sensorValue : null;
        this.lastTemperatureTime2 = filterTemp2.length > 0 ? filterTemp2[filterTemp2.length - 1].createdAt : null;

        this.lastVoltage1 = voltage1.length > 0 ? voltage1[voltage1.length - 1].sensorValue : null;
        this.lastVoltage1Time = voltage1.length > 0 ? voltage1[voltage1.length - 1].createdAt : null;

        this.lastVoltage2 = voltage2.length > 0 ? voltage2[voltage2.length - 1].sensorValue : null;
        this.lastVoltage2Time = voltage2.length > 0 ? voltage2[voltage2.length - 1].createdAt : null;

        this.lastVoltage3 = voltage3.length > 0 ? voltage3[voltage3.length - 1].sensorValue : null;
        this.lastVoltage3Time = voltage3.length > 0 ? voltage3[voltage3.length - 1].createdAt : null;


        this.smoke1 = smoke1.length > 0 ? smoke1[smoke1.length - 1].sensorValue : null;
        this.lastSomek1Time = smoke1.length > 0 ? smoke1[smoke1.length - 1].createdAt : null;


        this.smoke2 = smoke2.length > 0 ? smoke2[smoke2.length - 1].sensorValue : null;
        this.lastSomek2Time = smoke2.length > 0 ? smoke2[smoke2.length - 1].createdAt : null;

        this.smoke3 = smoke3.length > 0 ? smoke3[smoke3.length - 1].sensorValue : null;
        this.lastSomek3Time = smoke3.length > 0 ? smoke3[smoke3.length - 1].createdAt : null;


        this.liquid1 = liquid1.length > 0 ? liquid1[liquid1.length - 1].sensorValue : null;
        this.lastLiquid1Time = liquid1.length > 0 ? liquid1[liquid1.length - 1].createdAt : null;

        this.liquid2 = liquid2.length > 0 ? liquid2[liquid2.length - 1].sensorValue : null;
        this.lastLiquid2Time = liquid2.length > 0 ? liquid2[liquid2.length - 1].createdAt : null;



        this.humidity1 = humidity1.length > 0 ? humidity1[humidity1.length - 1].sensorValue : null;
        this.lastHumidity1Time = humidity1.length > 0 ? humidity1[humidity1.length - 1].createdAt : null;

        this.humidity2 = humidity2.length > 0 ? humidity2[humidity2.length - 1].sensorValue : null;
        this.lastHumidity2Time = humidity2.length > 0 ? humidity2[humidity2.length - 1].createdAt : null;


        //frequency

        this.frequency1 = frequency1.length > 0 ? frequency1[frequency1.length - 1].sensorValue : null;
        this.lastFrequency1Time = frequency1.length > 0 ? frequency1[frequency1.length - 1].createdAt : null;
        this.frequency2 = frequency2.length > 0 ? frequency2[frequency2.length - 1].sensorValue : null;
        this.lastFrequency2Time = frequency2.length > 0 ? frequency2[frequency2.length - 1].createdAt : null;
        this.frequency3 = frequency3.length > 0 ? frequency3[frequency3.length - 1].sensorValue : null;
        this.lastFrequency3Time = frequency3.length > 0 ? frequency3[frequency3.length - 1].createdAt : null;

        //current


        this.current1 = current1.length > 0 ? current1[current1.length - 1].sensorValue : null;
        this.lastCurrent1Time = current1.length > 0 ? current1[current1.length - 1].createdAt : null;

        this.current2 = current2.length > 0 ? current2[current2.length - 1].sensorValue : null;
        this.lastCurrent2Time = current2.length > 0 ? current2[current2.length - 1].createdAt : null;

        this.current3 = current3.length > 0 ? current3[current3.length - 1].sensorValue : null;
        this.lastCurrent3Time = current3.length > 0 ? current3[current3.length - 1].createdAt : null;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }



}
