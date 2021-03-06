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

angular.module('dre.record.immunizations', [])

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/record/immunizations', {
      templateUrl: 'templates/record/components/immunizations.tpl.html',
      controller: 'recordsCtrl'
    });
  }
])

.controller('immunizationsCtrl', ['$scope', '$http', '$location', 'recordFunctions',
  function($scope, $http, $location, recordFunctions) {

    $scope.immunizations = [];
    $scope.displayImmunizations = false;
    $scope.immunizationPredicate = "-date_weight";

    $scope.getRecord = function() {
      $http({
        method: 'GET',
        url: '/api/v1/record/immunizations'
      }).
      success(function(data, status, headers, config) {
        $scope.immunizations = data.immunizations;
        if ($scope.immunizations.length > 0) {
          $scope.displayImmunizations = true;
          $scope.updateFields();
        } else {
          $scope.displayImmunizations = false;
        }
      }).
      error(function(data, status, headers, config) {
        console.log('error');
      });
    };

    $scope.updateFields = function() {
      for (var i in $scope.immunizations) {
  
        recordFunctions.extractName($scope.immunizations[i]);
        recordFunctions.formatDate($scope.immunizations[i].date);
  
        $scope.immunizations[i].date_weight = $scope.immunizations[i].date[0].date;
        $scope.immunizations[i].name = recordFunctions.truncateName($scope.immunizations[i].name);
  
        if ($scope.immunizations[i].administration.dose) {
          recordFunctions.formatQuantity($scope.immunizations[i].administration.dose);
        }
  
        if ($scope.immunizations[i].performer.address) {
          for (var perAddr in $scope.immunizations[i].performer.address) {
            recordFunctions.formatAddress($scope.immunizations[i].performer.address[perAddr]);
          }
        }
  
        if ($scope.immunizations[i].performer.name) {
          for (var perName in $scope.immunizations[i].performer.name) {
            recordFunctions.formatName($scope.immunizations[i].performer.name[perName]);  
          }
        }
      }
    };

    $scope.getStub = function() {
      $scope.displayImmunizations = true;
      $scope.immunizations = [{
        "date": [{
          "date": "1999-11-01T00:00:00.000Z",
          "precision": "month"
        }],
        "identifiers": [{
          "identifier": "e6f1ba43-c0ed-4b9b-9f12-f435d8ad8f92"
        }],
        "status": "complete",
        "product": {
          "name": "Influenza virus vaccine",
          "code": "88",
          "code_system_name": "CVX",
          "translations": [{
            "name": "Influenza, seasonal, injectable",
            "code": "141",
            "code_system_name": "CVX"
          }],
          "lot_number": "1",
          "manufacturer": "Health LS - Immuno Inc."
        },
        "administration": {
          "route": {
            "name": "Intramuscular injection",
            "code": "C28161",
            "code_system_name": "Medication Route FDA"
          },
          "quantity": {
            "value": 50,
            "unit": "mcg"
          }
        },
        "performer": {
          "identifiers": [{
            "identifier": "2.16.840.1.113883.19.5.9999.456",
            "identifier_type": "2981824"
          }],
          "name": [{
            "last": "Assigned",
            "first": "Amanda"
          }],
          "address": [{
            "streetLines": [
              "1021 Health Drive"
            ],
            "city": "Ann Arbor",
            "state": "MI",
            "zip": "99099",
            "country": "US"
          }],
          "organization": [{
            "identifiers": [{
              "identifier": "2.16.840.1.113883.19.5.9999.1394"
            }],
            "name": [
              "Good Health Clinic"
            ]
          }]
        }
      }, {
        "date": [{
          "date": "1998-12-15T00:00:00.000Z",
          "precision": "day"
        }],
        "identifiers": [{
          "identifier": "e6f1ba43-c0ed-4b9b-9f12-f435d8ad8f92"
        }],
        "status": "refused",
        "product": {
          "name": "Influenza virus vaccine",
          "code": "88",
          "code_system_name": "CVX",
          "translations": [{
            "name": "Influenza, seasonal, injectable",
            "code": "141",
            "code_system_name": "CVX"
          }],
          "lot_number": "1",
          "manufacturer": "Health LS - Immuno Inc."
        },
        "administration": {
          "route": {
            "name": "Intramuscular injection",
            "code": "C28161",
            "code_system_name": "Medication Route FDA"
          },
          "quantity": {
            "value": 50,
            "unit": "mcg"
          }
        },
        "performer": {
          "identifiers": [{
            "identifier": "2.16.840.1.113883.19.5.9999.456",
            "identifier_type": "2981824"
          }],
          "name": [{
            "last": "Assigned",
            "first": "Amanda"
          }],
          "address": [{
            "streetLines": [
              "1021 Health Drive"
            ],
            "city": "Ann Arbor",
            "state": "MI",
            "zip": "99099",
            "country": "US"
          }],
          "organization": [{
            "identifiers": [{
              "identifier": "2.16.840.1.113883.19.5.9999.1394"
            }],
            "name": [
              "Good Health Clinic"
            ]
          }]
        }
      }, {
        "date": [{
          "date": "1998-12-15T00:00:00.000Z",
          "precision": "day"
        }],
        "identifiers": [{
          "identifier": "e6f1ba43-c0ed-4b9b-9f12-f435d8ad8f92"
        }],
        "status": "complete",
        "product": {
          "name": "Pneumococcal polysaccharide vaccine",
          "code": "33",
          "code_system_name": "CVX",
          "translations": [{
            "name": "Pneumococcal NOS",
            "code": "109",
            "code_system_name": "CVX"
          }],
          "lot_number": "1",
          "manufacturer": "Health LS - Immuno Inc."
        },
        "administration": {
          "route": {
            "name": "Intramuscular injection",
            "code": "C28161",
            "code_system_name": "Medication Route FDA"
          },
          "quantity": {
            "value": 50,
            "unit": "mcg"
          }
        },
        "performer": {
          "identifiers": [{
            "identifier": "2.16.840.1.113883.19.5.9999.456",
            "identifier_type": "2981824"
          }],
          "name": [{
            "last": "Assigned",
            "first": "Amanda"
          }],
          "address": [{
            "streetLines": [
              "1021 Health Drive"
            ],
            "city": "Ann Arbor",
            "state": "MI",
            "zip": "99099",
            "country": "US"
          }],
          "organization": [{
            "identifiers": [{
              "identifier": "2.16.840.1.113883.19.5.9999.1394"
            }],
            "name": [
              "Good Health Clinic"
            ]
          }]
        }
      }, {
        "date": [{
          "date": "1998-12-15T00:00:00.000Z",
          "precision": "day"
        }],
        "identifiers": [{
          "identifier": "e6f1ba43-c0ed-4b9b-9f12-f435d8ad8f92"
        }],
        "status": "refused",
        "product": {
          "name": "Tetanus and diphtheria toxoids - preservative free",
          "code": "103",
          "code_system_name": "CVX",
          "translations": [{
            "name": "Tetanus and diphtheria toxoids - preservative free",
            "code": "09",
            "code_system_name": "CVX"
          }],
          "lot_number": "1",
          "manufacturer": "Health LS - Immuno Inc."
        },
        "administration": {
          "route": {
            "name": "Intramuscular injection",
            "code": "C28161",
            "code_system_name": "Medication Route FDA"
          },
          "quantity": {
            "value": 50,
            "unit": "mcg"
          }
        },
        "performer": {
          "identifiers": [{
            "identifier": "2.16.840.1.113883.19.5.9999.456",
            "identifier_type": "2981824"
          }],
          "name": [{
            "last": "Assigned",
            "first": "Amanda"
          }],
          "address": [{
            "streetLines": [
              "1021 Health Drive"
            ],
            "city": "Ann Arbor",
            "state": "MI",
            "zip": "99099",
            "country": "US"
          }],
          "organization": [{
            "identifiers": [{
              "identifier": "2.16.840.1.113883.19.5.9999.1394"
            }],
            "name": [
              "Good Health Clinic"
            ]
          }]
        },
        "refusal_reason": "Patient objection"
      }];
      $scope.updateFields();
    };

    $scope.getRecord();
    //$scope.getStub();

  }
]);