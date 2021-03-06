/*
 * Copyright 2015-2017 WorldWind Contributors
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
define([
    'src/formats/kml/features/KmlScreenOverlay',
    'src/util/XmlDocument'
], function (
    KmlScreenOverlay,
    XmlDocument
) {
    "use strict";
    describe("KmlScreenOverlayTest", function () {
            var validKml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
                "<kml xmlns=\"http://www.opengis.net/kml/2.2\">" +
                "<ScreenOverlay>" +
                "   <rotation>0</rotation>" +
                "</ScreenOverlay>" +
                "</kml>";
            var kmlRepresentation = new XmlDocument(validKml).dom();
            var screenOverlay = new KmlScreenOverlay({objectNode:
                kmlRepresentation.getElementsByTagName("ScreenOverlay")[0]});
            it("should have the Rotation property", function(){
                expect(screenOverlay.kmlRotation).toEqual(0);
            });
        });
    });
