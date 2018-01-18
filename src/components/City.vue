<template>
  <div class="city text-center">
    <span>{{  aaa  }}</span>


    <div style="margin: 10px 0;">
        chooice city:
        <select @change="getCity()" v-model="selectedCity" >
            <option v-for="city in cities">{{ city }}</option>
        </select>
    </div>
    

    <table class="table">
      <thead>
        <th>Date</th>
        <th>Temp</th>
        <th>Min_Temp</th>
        <th>Max_Temp</th>
        <th>Humidity</th>
        <th>Pressure</th>
      </thead>

      <tbody>
        <tr v-for="rep in report">
          <td> {{ rep.date }}</td>
          <td> {{ rep.temp }}</td>
          <td> {{ rep.temp_min }}</td>
          <td> {{ rep.temp_max }} </td>
          <td> {{ rep.humidity }}</td>
          <td> {{ rep.pressure }}</td>
        </tr>
      </tbody>
    </table>


    <div id="graphicalContainer"></div>
  </div>
</template>

<script>
import json from './cities.json';
export default {
  name: 'City',
  data () {
    return {
      report: {},
      aaa: "",
      city : this.$route.params.cityName,
      cities : json,
      selectedCity : this.$route.params.cityName
    }
  },

  mounted: function() {
    this.onload();    
  },

  methods: {
    getCity: function() {
       this.$router.push(this.selectedCity);
       this.onload();
    },

    onload: function() {
      axios.get("http://api.openweathermap.org/data/2.5/forecast?q="  + this.selectedCity + "&APPID=0dc6613351d05fc47161defa0015064a&units=imperial")
        .then(response => {
            console.log(response);
            this.aaa = " ";
            let dates = [];
            this.report["day1"] = response.data.list[0].main;
            this.report["day1"]["date"] = response.data.list[0].dt_txt.split(" ")[0];
            this.report["day2"] = response.data.list[8].main;
            this.report["day2"]["date"] = response.data.list[8].dt_txt.split(" ")[0];
            this.report["day3"] = response.data.list[16].main;
            this.report["day3"]["date"] = response.data.list[16].dt_txt.split(" ")[0];
            this.report["day4"] = response.data.list[24].main;
            this.report["day4"]["date"] = response.data.list[24].dt_txt.split(" ")[0];
            this.report["day5"] = response.data.list[35].main;
            this.report["day5"]["date"] = response.data.list[34].dt_txt.split(" ")[0];
            console.log(this.report)
            for(let i = 1; i <= 5; i++) {
              dates.push(this.report["day" + i]["date"]);
            }

            var tempMap = {};
            for (let i = 0; i < response.data.list.length; i++) {
                let date = response.data.list[i].dt_txt.split(" ")[0].toString()
                let tempArr = [];
                if (tempMap[date] != undefined) {
                    tempArr = tempMap[date];
                }
                tempArr.push(response.data.list[i].main.temp);
                tempMap[date] = tempArr;
            }
        
            Highcharts.chart('graphicalContainer', {
                title: {
                    text: 'Temparature'
                },
                subtitle: {
                    text: '(5 days)'
                },
                yAxis: {
                    title: {
                        text: 'Temparature'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: new Date().getDate()
                    }
                },
                series: [{
                    name: dates[0],
                    data: tempMap[this.report["day1"]["date"]]
                }, {
                    name: dates[1],
                    data: tempMap[this.report["day2"]["date"]]
                }, {
                    name: dates[2],
                    data: tempMap[this.report["day3"]["date"]]
                }, {
                    name: dates[3],
                    data: tempMap[this.report["day4"]["date"]]
                }, {
                    name: dates[4],
                    data: tempMap[this.report["day5"]["date"]]
                }],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            });
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


table {
  table-layout: fixed;

}

th {
  text-align: center;
}

#graphicalContainer {

}
</style>
