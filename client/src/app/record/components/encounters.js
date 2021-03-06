/*=======================================================================
Copyright 2013 Amida Technology Solutions (http://amida-tech.com)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
======================================================================*/

angular.module('dre.record.encounters', [])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/record/encounters', {
      templateUrl: 'templates/record/components/encounters.tpl.html',
      controller: 'recordsCtrl'
    });
  }
])

.controller('encountersCtrl', ['$scope', '$http', '$location', 'recordFunctions',
  function($scope, $http, $location, recordFunctions) {

    $scope.encounters = [];
    $scope.displayEncounters = false;
    $scope.encounterPredicate = "-date_weight";

    $scope.getRecord = function() {
      $http({
        method: 'GET',
        url: '/api/v1/record/encounters'
      }).
      success(function(data, status, headers, config) {
        $scope.encounters = data.encounters;
        if ($scope.encounters.length > 0) {
          $scope.displayEncounters = true;
          $scope.updateFields();
        } else {
          $scope.displayEncounters = false;
        }
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });
    };

    $scope.updateFields = function() {
      for (var i in $scope.encounters) {
        recordFunctions.extractName($scope.encounters[i]);
        $scope.encounters[i].name = recordFunctions.truncateName($scope.encounters[i].name);
        recordFunctions.formatDate($scope.encounters[i].date);
        $scope.encounters[i].date_weight = $scope.encounters[i].date[0].date;
        for (var ii in $scope.encounters[i].locations) {
          recordFunctions.formatAddress($scope.encounters[i].locations[ii].addresses[0]);
        }
      }
    };

    $scope.getStub = function() {
      $scope.displayEncounters = true;
      $scope.encounters = [{
        "identifiers": [{
          "identifier": "2a620155-9d11-439e-92b3-5d9815ff4de8"
        }],
        "date": [{
          "date": "2009-02-27T13:00:00.000Z",
          "precision": "subsecond"
        }],
        "locations": [{
          "name": "Community Urgent Care Center",
          "loc_type": {
            "name": "Urgent Care Center",
            "code": "1160-1",
            "code_system_name": "HealthcareServiceLocation"
          },
          "addresses": [{
            "streetLines": [
              "17 Daws Rd."
            ],
            "city": "Blue Bell",
            "state": "MA",
            "zip": "02368",
            "country": "US"
          }]
        }],
        "findings": [{
          "name": "Pneumonia",
          "code": "233604007",
          "code_system_name": "SNOMED CT"
        }],
        "name": "Office outpatient visit 15 minutes",
        "code": "99213",
        "code_system_name": "CPT",
        "translations": [{
          "name": "Ambulatory",
          "code": "AMB",
          "code_system_name": "HL7ActCode"
        }]
      },
      {
        "identifiers": [{
          "identifier": "2a620155-9d11-439e-92b3-5d9815ff4de8"
        }],
        "date": [{
          "date": "2013-02-27T13:00:00.000Z",
          "precision": "subsecond"
        }],
        "locations": [{
          "name": "Community Urgent Care Center",
          "loc_type": {
            "name": "Urgent Care Center",
            "code": "1160-1",
            "code_system_name": "HealthcareServiceLocation"
          },
          "addresses": [{
            "streetLines": [
              "17 Daws Rd."
            ],
            "city": "Blue Bell",
            "state": "MA",
            "zip": "02368",
            "country": "US"
          }]
        }],
        "findings": [{
          "name": "Pneumonia",
          "code": "233604007",
          "code_system_name": "SNOMED CT"
        }],
        "name": "Very special visit",
        "code": "99213",
        "code_system_name": "CPT",
        "translations": [{
          "name": "Ambulatory",
          "code": "AMB",
          "code_system_name": "HL7ActCode"
        }]
      },
      {
        "identifiers": [{
          "identifier": "2a620155-9d11-439e-92b3-5d9815ff4de8"
        }],
        "date": [{
          "date": "2010-02-27T13:00:00.000Z",
          "precision": "subsecond"
        }],
        "locations": [{
          "name": "Community Urgent Care Center",
          "loc_type": {
            "name": "Urgent Care Center",
            "code": "1160-1",
            "code_system_name": "HealthcareServiceLocation"
          },
          "addresses": [{
            "streetLines": [
              "17 Daws Rd."
            ],
            "city": "Blue Bell",
            "state": "MA",
            "zip": "02368",
            "country": "US"
          }]
        }],
        "findings": [{
          "name": "Pneumonia",
          "code": "233604007",
          "code_system_name": "SNOMED CT"
        }],
        "name": "Special Visit",
        "code": "99213",
        "code_system_name": "CPT",
        "translations": [{
          "name": "Ambulatory",
          "code": "AMB",
          "code_system_name": "HL7ActCode"
        }]
      }];
      
      $scope.updateFields();
    };

    $scope.getRecord();
    //$scope.getStub();
  }
]);