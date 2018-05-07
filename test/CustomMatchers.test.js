/*
 * Copyright 2015-2018 WorldWind Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([], function () {
    "use strict";

    var CustomMatchers = function () {
    };

    CustomMatchers.toBeVec3 = function (util, customEqualityTesters) {
        return {
            compare: function (actual, expected) {
                var xpass = (actual[0] === expected[0]),
                    ypass = (actual[1] === expected[1]),
                    zpass = (actual[2] === expected[2]);
                return {
                    pass: xpass && ypass && zpass
                }
            }
        };
    };

    CustomMatchers.toBeCloseToVec3 = function (util, customEqualityTesters) {
        return {
            compare: function (actual, expected, precision) {
                var xpass = CustomMatchers.compareNumbers(actual[0], expected[0], precision),
                    ypass = CustomMatchers.compareNumbers(actual[1], expected[1], precision),
                    zpass = CustomMatchers.compareNumbers(actual[2], expected[2], precision);
                return {
                    pass: xpass && ypass && zpass
                }
            }
        };
    };

    CustomMatchers.toBeCloseToPosition = function (util, customEqualityTesters) {
        return {
            compare: function (actual, expected, latitudePrecision, longitudePrecision, altitudePrecision) {
                var latpass = CustomMatchers.compareNumbers(actual.latitude, expected.latitude, latitudePrecision),
                    lonpass = CustomMatchers.compareNumbers(actual.longitude, expected.longitude, longitudePrecision),
                    altpass = CustomMatchers.compareNumbers(actual.altitude, expected.altitude, altitudePrecision);
                return {
                    pass: latpass && lonpass && altpass
                }
            }
        };
    };

    CustomMatchers.toEqualVec3 = function (util, customEqualityTesters) {
        return {
            compare: function (actual, expected, delta) {
                var difference = actual.distanceTo(expected);
                return {
                    pass: difference <= delta,
                    message: "Expected " + actual + " to equal " + expected + ", but the difference is " + difference
                };
            }
        };
    };

    CustomMatchers.toBeSector = function (util, customEqualityTesters) {
        return {
            compare: function (actual, expected) {
                var doMatch = (actual.minLatitude === expected.minLatitude) &&
                        (actual.maxLatitude === expected.maxLatitude) &&
                        (actual.minLongitude === expected.minLongitude) &&
                        (actual.maxLongitude === expected.maxLongitude);
                return {
                    pass: doMatch,
                    message: "Expected minLat: " + actual.minLatitude + ", maxLat: " + actual.maxLatitude
                        + ", minLon: " + actual.minLongitude + ", maxLon: " + actual.maxLongitude
                        + " to equal " + "minLat: " + expected.minLatitude + ", maxLat: " + expected.maxLatitude
                        + ", minLon: " + expected.minLongitude + ", maxLon: " + expected.maxLongitude
                }
            }
        }
    };

    CustomMatchers.compareNumbers = function (actual, expected, precision) {
        var pow = Math.pow(10, precision + 1);
        var delta = Math.abs(expected - actual);
        var maxDelta = Math.pow(10, -precision) / 2;

        return (Math.round(delta * pow) / pow) <= maxDelta;
    };

    return CustomMatchers;
});