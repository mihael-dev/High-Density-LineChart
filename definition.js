define(["qlik"], function (qlik) {
    'use strict';
    var app = qlik.currApp(this);
    function getTheme() {
        return new Promise(resolve => {

            var app = qlik.currApp(this);
            app.theme.getApplied().then(function (qtheme) {

                return resolve(qtheme);


            });
        })

    }

    return {

        type: "items",
        component: "accordion",
        items: {



            /*data: {
                uses: "data"
            }, */
            dimensions: {
                uses: "dimensions",
                min: 1,
                max: 2

                /*,
                items: {
                    colorExpression:{
                    
                        type: "string",
                        
                        label: "Color by dimension",
                        
                        ref:"qAttributeExpressions.0.qExpression",
                        
                        expression:"optional"
                    
                    }
                    
                }*/
            },
            measures: {
                uses: "measures",

                min: 1,
                max: 4,
                /*items: {
                    colorExpression:{
                    
                        type: "string",
                        
                        label: "Color by expression",
                        
                        ref:"qAttributeExpressions.0.qExpression",
                        
                        expression:"optional"
                    
                    }
                    
                }

                items: {

                    /*singleColor: {
                        label:"Single Color",
                        component: "color-picker",
                        ref:"qAttributeExpressions.0.qExpression",
                        type: "integer",
                        defaultValue: 3
                    },

                    colorExpression:{
                        //show: function(layout)  { if( layout.coloring.type=='exp' ){ return true } else { return false } },

                        type: "string",
                        label: "Enter color expression",

                
                    
                
                        ref:"qAttributeExpressions.0.qExpression",
                
                        expression: "optional",
                        defaultValue: ''

                        
                        }
                
                }*/




            },
            sorting: {
                uses: "sorting"
            },
            addons: {
                uses: "addons",
                items: {
                    dataHandling: {
                        uses: "dataHandling"
                    },
                    maxRecord: {
                        type: "integer",
                        label: "Max records",
                        ref: "maxRecord",
                        defaultValue: "5000",
                        expression: "optional"

                    },
                    lines: {
                        type: 'array',
                        ref: 'refLineList',
                        label: 'Lines',
                        itemTitleRef: 'line.label',
                        allowAdd: true,
                        allowRemove: true,
                        allowCopy: true,
                        addTranslation: 'Add Line',

                        items: {
                            lineLable: {
                                type: "string",
                                label: "Line label",
                                ref: "line.label",
                                defaultValue: "",
                                expression: "optional"

                            },
                            lineGeometry: {
                                type: "string",
                                label: "Line Geometry (e.g. [x1,y1], [x2,y2])",
                                ref: "line.geometry",
                                defaultValue: "",
                                expression: "optional"

                            }/*,
                            yLine:{
                                type:"string",
                                label: "Y coordinates",
                                ref: "line.yLineCoord",
                                defaultValue: "",
                                expression: "optional"
                                
                            }*/
                            ,
                            lineColor: {
                                label: "Line color",
                                component: "color-picker",
                                ref: "line.lineColor",
                                type: "integer",
                                defaultValue: {
                                    color: "#ff5866",
                                    index: "-1"
                                }
                            },
                            lineWidth: {
                                type: "number",
                                component: "slider",
                                label: "Line width",
                                ref: "line.width",
                                min: 0.5,
                                max: 10,
                                step: 0.5,
                                defaultValue: 1
                            },
                            mode: {
                                type: "string",
                                component: "dropdown",
                                label: "Mode",
                                ref: "line.mode",
                                options: [{
                                    value: "lines",
                                    label: "Lines"
                                }, {
                                    value: "markers",
                                    label: "Markers"
                                }, {
                                    value: "lines+markers",
                                    label: "Lines+Markers"
                                }, {
                                    value: "lines+markers+text",
                                    label: "Lines+Markers+Text"
                                }, {
                                    value: "markers+text",
                                    label: "Markers+Text"
                                }, {
                                    value: "text",
                                    label: "Text"
                                }],
                                defaultValue: "lines"
                            },
                            lineStyle: {
                                type: "string",
                                component: "dropdown",
                                label: "Line style",
                                ref: "line.lineStyle",
                                options: [{
                                    value: "solid",
                                    label: "Solid"
                                }, {
                                    value: "dot",
                                    label: "Dot"
                                }, {
                                    value: "dashdot",
                                    label: "Dashdot"
                                }, {
                                    value: "longdash",
                                    label: "Longdash"
                                }],
                                defaultValue: "solid"
                            },
                            lineShape: {
                                type: "string",
                                component: "dropdown",
                                label: "Line shape",
                                ref: "line.shape",
                                options: [{
                                    value: "linear",
                                    label: "linear"
                                }, {
                                    value: "spline",
                                    label: "spline"
                                }, {
                                    value: "vhv",
                                    label: "vhv"
                                }, {
                                    value: "hvh",
                                    label: "hvh"
                                }, {
                                    value: "vh",
                                    label: "vh"
                                }, {
                                    value: "hv",
                                    label: "hv"
                                }],
                                defaultValue: "linear"
                            },
                            showlegend: {
                                type: "boolean",
                                label: "Show in legend",
                                ref: "line.showLegend",
                                defaultValue: true
                            }


                        }

                    }, shapes: {
                        type: 'array',
                        ref: 'shapes',
                        label: 'Shapes',
                        itemTitleRef: 'shape.label',
                        allowAdd: true,
                        allowRemove: true,
                        allowCopy: true,
                        addTranslation: 'Add Shape',
                        items: {
                            lineLable: {
                                type: "string",
                                label: "Shape label",
                                ref: "shape.label",
                                defaultValue: "",
                                expression: "optional"

                            },

                            shapeType: {
                                type: "string",
                                component: "dropdown",
                                label: "Shape type",
                                ref: "shape.type",
                                options: [{
                                    value: "line",
                                    label: "Line"
                                }, {
                                    value: "rect",
                                    label: "Rect"
                                }],
                                defaultValue: "line"
                            },
                            refLine: {
                                type: "string",
                                component: "dropdown",
                                label: "Reference Line (Shape)",
                                ref: "shape.refLine",

                                options: [{
                                    value: "-",
                                    label: "-"
                                }, {
                                    value: "v",
                                    label: "Vertical"
                                }, {
                                    value: "h",
                                    label: "Horizontal"
                                }],
                                defaultValue: "-"
                            },
                            x0: {
                                type: "string",
                                label: "x0",
                                ref: "shape.x0",
                                defaultValue: "",
                                expression: "optional",
                                show: function (layout) {
                                    return layout.shape.refLine !== 'h'
                                }


                            },
                            y0: {
                                type: "string",
                                label: "y0",
                                ref: "shape.y0",
                                defaultValue: "",
                                expression: "optional",
                                show: function (layout) {
                                    return layout.shape.refLine !== 'v'
                                }

                            },
                            x1: {
                                type: "string",
                                label: "x1",
                                ref: "shape.x1",
                                defaultValue: "",
                                expression: "optional",
                                show: function (layout) {
                                    return layout.shape.refLine !== 'h'
                                }

                            },
                            y1: {
                                type: "string",
                                label: "y1",
                                ref: "shape.y1",
                                defaultValue: "",
                                expression: "optional",
                                show: function (layout) {
                                    return layout.shape.refLine !== 'v'
                                }

                            },
                            shapeWidth: {
                                type: "number",
                                component: "slider",
                                label: "Line width",
                                ref: "shape.width",
                                min: 0.5,
                                max: 10,
                                step: 0.5,
                                defaultValue: 1
                            },

                            shapeColor: {
                                label: "Color",
                                component: "color-picker",
                                ref: "shape.fillColor",
                                type: "integer",
                                defaultValue: {
                                    color: "#ff5866",
                                    index: "-1"
                                }
                            },
                            shapelineStyle: {
                                type: "string",
                                component: "dropdown",
                                label: "Line style",
                                ref: "shape.lineStyle",
                                options: [{
                                    value: "solid",
                                    label: "Solid"
                                }, {
                                    value: "dot",
                                    label: "Dot"
                                }, {
                                    value: "dashdot",
                                    label: "Dashdot"
                                }, {
                                    value: "longdash",
                                    label: "Longdash"
                                }],
                                defaultValue: "solid"
                            },
                            shapeOpacity: {
                                type: "number",
                                component: "slider",
                                label: "Shape Opacity ",
                                ref: "shape.opacity",
                                min: 0,
                                max: 1,
                                step: 0.1,
                                defaultValue: 1
                            },
                            layer: {
                                type: "string",
                                component: "dropdown",
                                label: "Layer Postion",
                                ref: "shape.layer",
                                options: [{
                                    value: "below",
                                    label: "Below"
                                }, {
                                    value: "above",
                                    label: "Above"
                                }],
                                defaultValue: "below"
                            }

                        }

                    }

                }
            },
            settings: {
                uses: "settings",
                items: {

                    Presentation: {
                        type: "items",
                        ref: "generalSettings",
                        label: "Presentation",
                        items: {
                            mode: {
                                type: "string",
                                component: "dropdown",
                                label: "Mode",
                                ref: "pres.mode",
                                options: [{
                                    value: "lines",
                                    label: "Lines"
                                }, {
                                    value: "markers",
                                    label: "Markers"
                                }, {
                                    value: "lines+markers",
                                    label: "Lines+Markers"
                                }, {
                                    value: "lines+markers+text",
                                    label: "Lines+Markers+Text"
                                }, {
                                    value: "markers+text",
                                    label: "Markers+Text"
                                }, {
                                    value: "text",
                                    label: "Text"
                                }],
                                defaultValue: "lines"
                            },
                            lineColor: {
                                label: "Marker Line Color",

                                component: "color-picker",
                                ref: "pres.marker.lineColor",
                                type: "integer",
                                defaultValue: {
                                    color: "#7b7a78",
                                    index: "-1"
                                }
                            },
                            markerlineWidth: {
                                type: "number",
                                component: "slider",
                                label: "Marker Line Width",
                                ref: "pres.marker.lineWidth",
                                min: 0,
                                max: 4,
                                step: 0.5,
                                defaultValue: 1

                            },
                            markerType: {
                                type: "string",
                                component: "dropdown",
                                label: "Marker Type",
                                ref: "pres.marker.type",
                                options: [{
                                    value: "circle",
                                    label: "Circle"
                                }, {
                                    value: "square",
                                    label: "Square"
                                }, {
                                    value: "diamond",
                                    label: "Diamond"
                                }, {
                                    value: "triangle-up",
                                    label: "Triangle-up"
                                }, {
                                    value: "pentagon",
                                    label: "Pentagon"
                                }, {
                                    value: "hexagon",
                                    label: "Hexagon"
                                }, {
                                    value: "cross",
                                    label: "Cross"
                                }],
                                defaultValue: "circle"
                            },
                            markerSize: {
                                type: "number",
                                component: "slider",
                                label: "Marker Size",
                                ref: "pres.marker.size",
                                min: 0,
                                max: 20,
                                step: 1,
                                defaultValue: 10
                            },
                            markerOpacity: {
                                type: "number",
                                component: "slider",
                                label: "Marker Opacity ",
                                ref: "pres.marker.opacity",
                                min: 0,
                                max: 1,
                                step: 0.1,
                                defaultValue: 1
                            },
                            lineWidth: {
                                type: "number",
                                component: "slider",
                                label: "Line Width",
                                ref: "pres.line.width",
                                min: 0.5,
                                max: 10,
                                step: 0.5,
                                defaultValue: 1
                            },
                            lineStyle: {
                                type: "string",
                                component: "dropdown",
                                label: "Line style",
                                ref: "pres.line.lineStyle",
                                options: [{
                                    value: "solid",
                                    label: "Solid"
                                }, {
                                    value: "dot",
                                    label: "Dot"
                                }, {
                                    value: "dashdot",
                                    label: "Dashdot"
                                }, {
                                    value: "longdash",
                                    label: "Longdash"
                                }],
                                defaultValue: "solid"
                            },
                            lineShape: {
                                type: "string",
                                component: "dropdown",
                                label: "Line shape",
                                ref: "pres.line.shape",
                                options: [{
                                    value: "linear",
                                    label: "linear"
                                }, {
                                    value: "spline",
                                    label: "spline"
                                }, {
                                    value: "vhv",
                                    label: "vhv"
                                }, {
                                    value: "hvh",
                                    label: "hvh"
                                }, {
                                    value: "vh",
                                    label: "vh"
                                }, {
                                    value: "hv",
                                    label: "hv"
                                }],
                                defaultValue: "linear"
                            },
                            lineOpacity: {
                                type: "number",
                                component: "slider",
                                label: "Line Opacity ",
                                ref: "pres.line.opacity",
                                min: 0,
                                max: 1,
                                step: 0.1,
                                defaultValue: 1
                            },

                        }
                    },
                    Color: {
                        type: "items",
                        ref: "color",
                        label: "Color",
                        items: {
                            colorsAndLegend: {
                                uses: "colorsAndLegend",
                                translation: "Colors",
                                items: {
                                    colors: {

                                        items: {
                                            colorMode: {
                                                options: function e() {
                                                    return [{
                                                        value: "primary",
                                                        translation: "properties.colorMode.primary"
                                                    }, {
                                                        value: "byDimension",
                                                        translation: "properties.colorMode.byDimension"
                                                    }, {
                                                        value: "byMeasure",
                                                        translation: "properties.colorMode.byMeasure"
                                                    }, {
                                                        value: "byExpression",
                                                        translation: "properties.colorMode.byExpression"
                                                    }]
                                                }
                                            },

                                            /*colorByLabel: {
                                                show: true
                                            },*/


                                            expressionLabel: {
                                                show: false
                                            },
                                            numberFormatting: {
                                                show: false
                                            },
                                            customRange: {
                                                show: false
                                            },




                                            colorSchemeMeasure: {
                                                show: function (layout) {
                                                    if (!layout.color.auto && layout.color.mode === "byMeasure" && !layout.color.useMeasureGradient) {
                                                        return true;
                                                    }
                                                }

                                            },

                                            colorPalette: {
                                                type: "string",
                                                label: "Color Palette (e.g. #ff0000,#00ff00)",
                                                ref: "prop.colorPalette",
                                                defaultValue: "#ff0000,#00ff00",
                                                expression: "optional",
                                                show: function (layout) {
                                                    if (!layout.color.auto && layout.color.mode === "byExpression" && !layout.color.expressionIsColor) {
                                                        return true;
                                                    } else {
                                                        return false;
                                                    }
                                                },

                                            },

                                            numberFormattingByMeasure: {
                                                type: "string",
                                                label: "Number Format D3.js (e.g. .2%)",
                                                ref: "coloring.numberFormat",
                                                defaultValue: "",
                                                show: function (layout) {
                                                    if (!layout.color.auto && (layout.color.mode === 'byMeasure')) {// || (layout.color.mode === "byExpression" && !layout.color.expressionIsColor))  ) { 
                                                        return true;
                                                    } else {
                                                        return false;
                                                    }
                                                },
                                                expression: "optional"

                                            },


                                        }
                                    },
                                    legend: {
                                        show: false
                                    }
                                }
                            },

                            exprColor: {
                                type: "boolean",
                                show: function (layout) { if (layout.coloring.type == 'exp') { return true } else { return false } },

                                ref: "prop.colorCode",
                                label: "The expression is a color code",
                                defaultValue: true
                            },
                            colorPalette: {
                                type: "string",
                                show: function (layout) { if (layout.coloring.type == 'exp' && layout.prop.colorCode == false) { return true } else { return false } },
                                label: "Color Pallette (e.g. #ff0000,#00ff00)",
                                ref: "prop.colorPalette",
                                defaultValue: "",
                                expression: "optional"

                            },

                        }
                    },
                    xAxisSettings: {
                        type: "items",
                        ref: "xAxisSettings",
                        label: "X Axis",
                        items: {
                            xTitle: {
                                type: "string",
                                label: "Title",
                                ref: "xAxisSettings.xTitle",
                                defaultValue: "",
                                expression: "always"

                            },
                            xAxisType: {
                                type: "string",

                                component: "dropdown",
                                label: "Axis Type",
                                ref: "xAxisSettings.type",
                                options: [{
                                    value: "-",
                                    label: "auto"
                                }, {
                                    value: "linear",
                                    label: "linear"
                                }, {
                                    value: "log",
                                    label: "log"
                                }, {
                                    value: "date",
                                    label: "date"
                                }, {
                                    value: "category",
                                    label: "category"
                                }, {
                                    value: "multicategory",
                                    label: "multicategory"
                                }],
                                defaultValue: "-"
                            },
                            xTickFormat: {
                                type: "string",
                                label: "D3.js Tick Label Format (e.g. %Y-%m-%d)",
                                ref: "xAxisSettings.tickFormat",
                                defaultValue: "",
                                expression: "optional"

                            },
                            showGrid: {
                                type: "boolean",
                                ref: "xAxisSettings.showGrid",
                                label: "Show Grid",
                                defaultValue: true
                            },
                            showLine: {
                                type: "boolean",
                                ref: "xAxisSettings.showLine",
                                label: "Show Line",
                                defaultValue: true
                            },

                            showZeroLine: {
                                type: "boolean",
                                label: "Show Zero Line",
                                ref: "xAxisSettings.showZeroLine",
                                defaultValue: false
                            },
                            showTicklabels: {
                                type: "boolean",
                                label: "Show Tick Labels",
                                ref: "xAxisSettings.showTicklabels",
                                defaultValue: true
                            },
                            rangeSlider: {
                                type: "boolean",
                                label: "Show Rangeslider",
                                ref: "xAxisSettings.showRangeslider",
                                defaultValue: false
                            },
                            //20201201 cvh 2: add dynamic x axis (min and max)
                            fixedDynamicInterval: {
                                type: "boolean",
                                component: "switch",
                                label: "Fixed Interval",
                                ref: "xAxisSettings.fixedDynamicInterval",
                                options: [{
                                    value: true,
                                    label: "Fixed"
                                }, {
                                    value: false,
                                    label: "Dynamic"
                                }],
                                defaultValue: true
                            },
                            minIntervalAxis: {
                                type: "string",
                                label: "Min",
                                ref: "xAxisSettings.minInterval",
                                expression: "always",
                                defaultValue: "",
                                show: function (data) {
                                    return !data.xAxisSettings.fixedDynamicInterval;
                                }
                            },
                            maxIntervalAxis: {
                                type: "string",
                                label: "Max",
                                ref: "xAxisSettings.maxInterval",
                                expression: "always",
                                defaultValue: "",
                                show: function (data) {
                                    return !data.xAxisSettings.fixedDynamicInterval;
                                }
                            }
                            //20201201 cvh 2: end
                            
                        }
                    },
                    yAxisSettings: {
                        type: "items",
                        ref: "yAxisSettings",
                        label: "Y Axis",
                        items: {
                            yTitle: {
                                type: "string",
                                label: "Title",
                                ref: "yAxisSettings.yTitle",
                                defaultValue: "",
                                expression: "always"

                            },
                            yAxisType: {
                                type: "string",
                                component: "dropdown",
                                label: "Axis Type",
                                ref: "yAxisSettings.type",
                                options: [{
                                    value: "-",
                                    label: "auto"
                                }, {
                                    value: "linear",
                                    label: "linear"
                                }, {
                                    value: "log",
                                    label: "log"
                                }, {
                                    value: "date",
                                    label: "date"
                                }, {
                                    value: "category",
                                    label: "category"
                                }, {
                                    value: "multicategory",
                                    label: "multicategory"
                                }],
                                defaultValue: "-"
                            },
                            yTickFormat: {
                                type: "string",
                                label: "Tick Label Format-D3.js (e.g. %Y-%m-/%d/)",
                                ref: "yAxisSettings.tickFormat",
                                defaultValue: "",
                                expression: "optional"

                            },
                            showGrid: {
                                type: "boolean",
                                ref: "yAxisSettings.showGrid",
                                label: "Show Grid",
                                defaultValue: true
                            },
                            showLine: {
                                type: "boolean",
                                ref: "yAxisSettings.showLine",
                                label: "Show Line",
                                defaultValue: true
                            },

                            showZeroLine: {
                                type: "boolean",
                                label: "Show Zero Line",
                                ref: "yAxisSettings.showZeroLine",
                                defaultValue: false
                            },
                            showTicklabels: {
                                type: "boolean",
                                label: "Show Tick Labels",
                                ref: "yAxisSettings.showTicklabels",
                                defaultValue: true
                            },
                            fixedDynamicInterval: {
                                type: "boolean",
                                component: "switch",
                                label: "Fixed Interval",
                                ref: "yAxisSettings.fixedDynamicInterval",
                                options: [{
                                    value: true,
                                    label: "Fixed"
                                }, {
                                    value: false,
                                    label: "Dynamic"
                                }],
                                defaultValue: true
                            },
                            minIntervalAxis: {
                                type: "string",
                                label: "Min",
                                ref: "yAxisSettings.minInterval",
                                expression: "always",
                                defaultValue: "",
                                show: function (data) {
                                    return !data.yAxisSettings.fixedDynamicInterval;
                                }
                            },
                            maxIntervalAxis: {
                                type: "string",
                                label: "Max",
                                ref: "yAxisSettings.maxInterval",
                                expression: "always",
                                defaultValue: "",
                                show: function (data) {
                                    return !data.yAxisSettings.fixedDynamicInterval;
                                }
                            }
                        }
                    },


                    //20201201 cvh 4: adding custom tooltip
                    //"uses: tooltip" works for Sep 2020, not for Feb 2020 patch 4 (customer version)
                    // tooltip: {
                    //     uses: "tooltip"
                    // },

                    /* Tooltip: {
                         type: "items",
                         ref: "tooltip",
                         label: "Tooltip",
                         items: {
                             Tooltip1: {
                                 type: "items",
                                 ref: "tooltip1",
                                 label: "Tooltip 1",
                                 items: {
                                     Tooltip1Measure: {
                                         type: "string",
                                         label: "Tooltip 1 Measure",
                                         ref:"qHyperCubeDef.qDimensions.0.qAttributeExpressions.0.qExpression",
                                         expression: "optional",
                                         defaultValue: ""
                                     },
                                     Tooltip1Label: {
                                         type: "string",
                                         label: "Tooltip 1 Label",
                                         ref:"tooltip1.label",
                                         expression: "optional",
                                         defaultValue: ""
                                     }
                                 }
                             
                             },
                             Tooltip2: {
                                 type: "items",
                                 ref: "tooltip2",
                                 label: "Tooltip 2",
                                 items: {
                                     Tooltip2Measure: {
                                         type: "string",
                                         label: "Tooltip 2 Measure",
                                         ref:"qHyperCubeDef.qDimensions.0.qAttributeExpressions.1.qExpression",
                                         expression:"optional",
                                         defaultValue: ""
                                     },
                                     Tooltip2Label: {
                                         type: "string",
                                         label: "Tooltip 2 Label",
                                         ref:"tooltip2.label",
                                         expression:"optional",
                                         defaultValue: ""
                                     }
                                 }                            
                             },
                             Tooltip3: {
                                 type: "items",
                                 ref: "tooltip3",
                                 label: "Tooltip 3",
                                 items: {
                                     Tooltip3Measure: {
                                         type: "string",
                                         label: "Tooltip 3 Measure",
                                         ref:"qHyperCubeDef.qDimensions.0.qAttributeExpressions.2.qExpression",
                                         expression:"optional",
                                         defaultValue: ""
                                     },
                                     Tooltip3Label: {
                                         type: "string",
                                         label: "Tooltip 3 Label",
                                         ref:"tooltip3.label",
                                         expression:"optional",
                                         defaultValue: ""
                                     }
                                 }                            
                             },
                             Tooltip4: {
                                 type: "items",
                                 ref: "Tooltip4",
                                 label: "Tooltip 4",
                                 items: {
                                     Tooltip4Measure: {
                                         type: "string",
                                         label: "Tooltip 4 Measure",
                                         ref:"qHyperCubeDef.qDimensions.0.qAttributeExpressions.3.qExpression",
                                         expression:"optional",
                                         defaultValue: ""
                                     },
                                     Tooltip4Label: {
                                         type: "string",
                                         label: "Tooltip 4 Label",
                                         ref:"tooltip4.label",
                                         expression:"optional",
                                         defaultValue: ""
                                     }
                                 }                            
                             },
                             Tooltip5: {
                                 type: "items",
                                 ref: "Tooltip5",
                                 label: "Tooltip 5",
                                 items: {
                                     Tooltip5Measure: {
                                         type: "string",
                                         label: "Tooltip 5 Measure",
                                         ref:"qHyperCubeDef.qDimensions.0.qAttributeExpressions.4.qExpression",
                                         expression:"optional",
                                         defaultValue: ""
                                     },
                                     Tooltip5Label: {
                                         type: "string",
                                         label: "Tooltip 5 Label",
                                         ref:"tooltip5.label",
                                         expression:"optional",
                                         defaultValue: ""
                                     }
                                 }                            
                             }
                         }
                     },*/

                    //20201201 cvh 4: end
                    Legend: {
                        type: "items",
                        ref: "legend",
                        label: "Legend",
                        items: {
                            /*displayModeBar:{
                                type: "string",
                                component: "dropdown",
                                label: "Display Mode Bar",
                                ref: "generalSettings.displayModeBar",
                                options: [{value:'1',label:'Always'},{value:'0',label:'on Hover'},{value:'-1',label:'Never'}],
                                defaultValue:'0'
                            },*/
                            showLegend: {
                                type: "boolean",
                                ref: "legend.showLegend",
                                label: "Show Legend",
                                defaultValue: true
                            },
                            orientation: {
                                type: "string",
                                ref: "legend.orientation",
                                label: "Orientation",
                                component: "dropdown",
                                options: [{
                                    value: "v",
                                    label: "Vertical"
                                }, {
                                    value: "h",
                                    label: "Horizontal"
                                }],
                                defaultValue: "vh"
                            }


                        }
                    },
                    LayoutSettings: {
                        type: "items",
                        ref: "layoutSettings",
                        label: "Layout Settings",
                        
                        items: {
                            //items: {
                            

                                marginLeft: {
                                    type: "string",
                                    label: "Margin-left",
                                    ref: "prop.margin.left",
                                    defaultValue: "",
                                    expression: "optional"

                                },
                                marginRight: {
                                    type: "string",
                                    label: "Margin-right",
                                    ref: "prop.margin.right",
                                    defaultValue: "",
                                    expression: "optional"

                                },
                                marginTop: {
                                    type: "string",
                                    label: "Margin-top",
                                    ref: "prop.margin.top",
                                    defaultValue: "",
                                    expression: "optional"

                                },
                                marginBottom: {
                                    type: "string",
                                    label: "Margin-bottom",
                                    ref: "prop.margin.bottom",
                                    defaultValue: "",
                                    expression: "optional"

                                },
                                toolbarBgColor: {
                                    type: "string",
                                    label: "Toolbar/Moodbar BgColor",
                                    ref: "prop.toolbar.bgColor",
                                    defaultValue: "='rgba(255,255,255,0)'",
                                    expression: "optional"
                                }
                            //}
                        }
                    },
                    GeneralSettings: {
                        type: "items",
                        ref: "generalSettings",
                        label: "General Settings",
                        
                        items: {
                            //items: {
                            
                                minimalMode: {
                                    type: "boolean",
                                    component: "switch",
                                    label: "Chart Mode",
                                    ref: "prop.standardMode",
                                    options: [{
                                        value: true,
                                        label: "Standard Mode"
                                    }, {
                                        value: false,
                                        label: "Max. Performance Mode"
                                    }],
                                    defaultValue: true
                                }
                             
                            //}
                        }
                    },
                    tooltipOptions: {
                        uses: "tooltip"
                    }
                }
            }
        }
    }
});