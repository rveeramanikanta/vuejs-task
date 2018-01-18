<template>
  <div class="home text-center">
    <input type="text" v-model="city" required/>
    <button class="btn btn-sm btn-success"  v-on:click="addCity">
        <i class="fa fa-plus" aria-hidden="true"></i> Add City
    </button>
    <br/>
    <div id="tableBlk">
        <table class="table">
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>City Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(city, idx) in cities">
                    <td>{{ idx }}</td>
                    <td><router-link :to="`/city/${city}`">{{ city }}</router-link></td>
                    <td>
                        <span class="btn btn-danger" v-on:click="deleteCity(idx)"><i class="fa fa-trash" aria-hidden="true"></i> Delete</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import json from './cities.json';
console.log(json);
export default {
  name: 'Home',
  data () {
    return {
        cities: json,
        city: "",
        isInvalidCity: false
    }
  },

  methods : {

      getExistingCities : function() {

      },

      addCity : function() {
          axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + this.city + "&APPID=0dc6613351d05fc47161defa0015064a")
            .then(response => {
                console.log(response);
                if (response.status == 200) {
                    this.city = response.data.name;                    
                    if (this.cities.indexOf(this.city) != -1) {
                        alert("city : " + this.city + " is already added!");
                    } else {
                        this.cities.push(this.city);
                    }
                    this.city = "";
                }
            })
            .catch(error => {
                alert("Invalid City!");
                this.city = "";
            })
      },

      updateCity : function(idx) {          
          this.city = this.cities[idx];
      },

      deleteCity: function(idx) {
        this.cities.splice(idx, 1);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #tableBlk table {
        border: 10px solid gray;
        margin-top: 20px; 
        table-layout: fixed;
    }

    #tableBlk td, #tableBlk th {
        padding: 5px;
        border: 2px solid gray;
    }

    #tableBlk th {
        text-align: center;
    }

</style>
