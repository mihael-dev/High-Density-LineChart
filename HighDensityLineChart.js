define(["qlik", "./definition", "./HighDensityChartBase", "./lib/plotly-latest.min", "text!./style.css"
],


	function (qlik, definition, highDensityChartBase, Plotly, cssContent) {

		$("<style>").html(cssContent).appendTo("head");

		return {
			initialProperties: {
				refLineList: [],
				shapes: [],
				qHyperCubeDef: {
					qDimensions: [],
					qMeasures: [],
					qInitialDataFetch: [{
						qWidth: 5,
						qHeight: 2000
					}]
				},
				selectionMode: "CONFIRM"
			},
			//template: template,	
			definition: definition,

			support: {
				snapshot: true,
				export: true,
				exportData: true
			},
			controller: ['$scope', function ($scope) {

				$scope.selectedElements = new Map();

			}],

			paint: function ($element, layout) {

				
				var self = this;
				var id = layout.qInfo.qId;

				//createPlot(layout);
				
				/*highDensityChartBase.paint($element, layout, this, "scatter").then(function() {
					//needed for export
					return qlik.Promise.resolve();
				});*/

				if (document.getElementById('T_' + id) == null) {
                    //let html = '<div id=' + 'T_' + id + ' style="width:100%;height:100%;"></div>';

                    let html = '<div id=' + 'T_' + id + ' style="width:100%;height:100%;">'
                        + '<div class="render-highdensity" id=' + 'Render_' + id + '><div class="center"><b>Rendering...</b></div></div></div>';

                        
                    /*if (rowcount > layout.maxRecord) {
                        html += '<div class="render-message">* Currently showing a limited data set. Add-Ons > Max Records</div>';
                    } */   
                    $element.html(html);
                } else {
                    $('#' + 'Render_' + id).show();

                }

                var TESTER = document.getElementById('T_' + id);


				highDensityChartBase.createPlot($element, layout, self, TESTER, "line").then(function() {

					//needed for export
					$('#' + 'Render_' + id).hide();
					
					return qlik.Promise.resolve();
				});


				
			},

			resize: function($element, layout) {
				var id = layout.qInfo.qId;
				var TESTER = document.getElementById('T_' + id);
				
				if (TESTER.data != null) {
					Plotly.Plots.resize(TESTER);
				}
			},
			
			paint2: function ($element, layout) {


				try {

					var self = this,
						id = layout.qInfo.qId,
						morebutton = false,
						hypercube = layout.qHyperCube,
						rowcount = hypercube.qDataPages[0].qMatrix.length,
						colcount = hypercube.qDimensionInfo.length + hypercube.qMeasureInfo.length,
						dimTitle = hypercube.qDimensionInfo[0].qFallbackTitle,

						meaX = hypercube.qMeasureInfo[0].qFallbackTitle,
						meaXFormatType = hypercube.qMeasureInfo[0].qNumFormat.qType,
						meaXFormatFmt = hypercube.qMeasureInfo[0].qNumFormat.qFmt,


						meaY = hypercube.qMeasureInfo[1].qFallbackTitle,
						meaYFormatType = hypercube.qMeasureInfo[1].qNumFormat.qType,
						meaYFormatFmt = hypercube.qMeasureInfo[1].qNumFormat.qFmt,

						app = qlik.currApp(this),
						extensionNamespace = "object.High-Density Scatter";


					var lastrow = 0
					var X = [],
						Y = [];




					if (document.getElementById('T_' + id) == null) {
						$element.html('<div id=' + 'T_' + id + ' style="width:100%;height:100%;">'
							+ '<div class="render-highdensity" id=' + 'Render_' + id + '><div class="center"> rendering....</div></div></div>');

					} else {
						$('#' + 'Render_' + id).show();

					}

					createPlot();




					function getTheme() {
						return new Promise(resolve => {
							app.theme.getApplied().then(function (qtheme) {

								resolve(qtheme);

							});
						});
					}

					function getFormattedCellValue(cell, axis) {
						// Date conversion X
						if (axis.type == 'date' && cell.qNum != 'NaN') {
							// Qlik Date Date(0) = 30.12.1899 > Java Script data Date(0) = 01.01.1970
							var qlikDateMillis = (cell.qNum - 25569) * 24 * 60 * 60 * 1000;
							// remove the calculation in local time
							qlikDateMillis = qlikDateMillis + new Date().getTimezoneOffset() * 60 * 1000;

							return qlikDateMillis;

						} else {
							if (cell.qNum != 'NaN') {
								return cell.qNum;
							} else {
								return cell.qText;
							}
						}
					}




					function getAndFillTracesMap(qtheme) {

						let tracesMap = new Map();

						if (layout.prop.standardMode) {
							self.backendApi.eachDataRow(function (rownum, row) {
								//var coords;
								var key;
								var colorbyMeasure;

								// Create a plotly tarce for each color

								if (layout.color.auto) {
									//key = qtheme.properties.dataColors.primaryColor;
									key = hypercube.qDimensionInfo[0].qFallbackTitle;


								} else {
									if (layout.color.mode === "primary") {
										//key = layout.color.paletteColor.color;
										key = hypercube.qDimensionInfo[0].qFallbackTitle;
									} else if (layout.color.mode === "byDimension") {
										key = row[0].qAttrDims.qValues[0].qText;
									} else if (layout.color.mode === "byMeasure") {
										key = dimTitle;

										const isColorExp = (expr) => expr.id === "colorByAlternative";
										var index = hypercube.qDimensionInfo[0].qAttrExprInfo.findIndex(isColorExp);

										colorbyMeasure = row[0].qAttrExps.qValues[index].qNum;
									} else if (layout.color.mode === "byExpression") {
										if (row[1].qAttrExps != null) {
											key = row[1].qAttrExps.qValues[0].qText;
										}
									} else {
										key = 'x';
									}

								}


								addRowToTracesMap(tracesMap, key, row[1], row[2], row[0].qText, row[0].qElemNumber, colorbyMeasure, row[0].qAttrExps);



								//20201201 cvh 4: adding custom tooltip
								//Tooltip
								//	var tmpTooltipArray = [];


								//Loop on my attribute expressions
								//hypercube.qDimensionInfo[0].qAttrExprInfo.forEach(function (callback, key) {
								//	row[0].qAttrExps.qValues.forEach(function (tooltipRow, key) {
								//Use tmp array for pushing array into another array
								//	tmpTooltipArray.push(tooltipRow.qText);

								//});


								//Final array
								//tooltipData.push(tmpTooltipArray);
								//20201201 cvh 4: end

							});
						} else {
							var row = self.backendApi.getDataRow(0);
							var x;
							var y; 
							var key;
							var coords;
							
							try {
								x = JSON.parse('[' + row[1].qText + ']');
								y = JSON.parse('[' + row[2].qText + ']');
								
								
							} catch (e) {
								console.info(e);
								x = [];
								y = [];
							}

							if (layout.color.auto) {
								key = qtheme.properties.dataColors.primaryColor;

							} else {
								//if (layout.color.mode === "primary") {
									//key = layout.color.paletteColor.color;
									key = hypercube.qDimensionInfo[0].qFallbackTitle;
								//} else {
								//	key = row[0].qText;
								//}
							} 
							
							coords = [x, y, [], [], [], []];
		
							tracesMap.set(key, coords);
						}


						return tracesMap;
					}

					function addRowToTracesMap(tracesMap, key, x, y, text, qElemNumber, colorbyMeasure, tooltipData) {
						var coords;
						if (tracesMap.get(key) != null) {
							coords = tracesMap.get(key)
						} else {
							coords = [[], [], [], [], [], []];

							// limit to 100 colors / traces
							if (tracesMap.size >= 100) {
								key = 'Others';
							}
							tracesMap.set(key, coords)
						}

						// x coordinate
						coords[0].push(getFormattedCellValue(x, layout.xAxisSettings));
						// y coordinate
						coords[1].push(getFormattedCellValue(y, layout.yAxisSettings));
						// add labels
						coords[2].push(text);
						// add qElemNumber for selection
						coords[3].push(qElemNumber);

						// add qElemNumber for selection
						if (colorbyMeasure != null) {
							coords[4].push(colorbyMeasure);
						}
						if (!layout.tooltip.auto && tooltipData != null) {
							var tp = [];
							tooltipData.qValues.forEach(function (tooltipRow, key) {
								//Use tmp array for pushing array into another array	

								tp.push(tooltipRow.qText);
							});
							coords[5].push(tp);
						}
					}


					async function createPlot() {

						
						
						var TESTER = document.getElementById('T_' + id);

						var qtheme = await getTheme();

						addtoArray();
						await getMoreData();

						$('#' + 'Render_' + id).hide();

						var tooltipData = [];
						
						let tracesMap = getAndFillTracesMap(qtheme);
							

						//20201201 cvh 2: add dynamic x axis (min and max)
						var minValxAxis;
						var maxValxAxis;
						if (!layout.xAxisSettings.fixedDynamicInterval) {
							minValxAxis = layout.xAxisSettings.minInterval;
							maxValxAxis = layout.xAxisSettings.maxInterval;
						}
						//20201201 cvh 2: end

						//20201201 cvh 4: adding custom tooltip
						//------ Below code works from Sep 2020 onwards (not for Feb 2020, don't know realeases bwtween Feb and Sep 2020)
						/*var tooltipLables = "";
						hypercube.qDimensionInfo[0].qAttrExprInfo.forEach(function (callback, key) {
								
							//TooltipLables
							  tooltipLables += '<br><b>' + callback.qFallbackTitle + ':</b> %{customdata['+ key + ']}';
							
						 });

						//------- Below code works for Feb 2020
						var tooltipLables = "";
						var tooltipLabelsArray = [];
						var i = 0;
						*/

						var tooltipLablesTop = "";
						var tooltipLablesBottom = "";

						if (!layout.tooltip.auto) {

							hypercube.qDimensionInfo[0].qAttrExprInfo.forEach(function (tooltip, key) {

								//TooltipLables
								if ((tooltip.id == "customTooltipTitle" || tooltip.id == "customTooltipDescription") && tooltip.qFallbackTitle != null) {
									tooltipLablesTop += '<br>%{customdata[' + key + ']}';

								} else if (tooltip.id == "customTooltipExpression"){
									tooltipLablesBottom += '<br>' + tooltip.qFallbackTitle + ': %{customdata[' + key + ']}'
								}

								//tooltipLables += ' %{customdata['+ key + ']}';

							});
						}




						//convert layout into array in order to check how many lables we have
						/*tooltipLabelsArray = Object.keys(layout);

						tooltipLabelsArray.forEach(function (callback, key) {
							if(callback.includes('tooltip')) {
								if(layout[callback].label.length > 0) {
									tooltipLables += '<br><b>' + layout[callback].label + ':</b> %{customdata['+ i + ']}';
									i++;
								}
							}
						});*/

						//20201201 cvh 4: end


						const graph_layout = {
							hovermode: "closest",
							dragmode: "pan",
							automargin: true,
							paper_bgcolor: 'rgba(0,0,0,0)',
							plot_bgcolor: 'rgba(0,0,0,0)',
							/*margin: {
								t: 
							},*/
							margin: {
								l: layout.prop.margin.left,
								r: layout.prop.margin.right,
								b: layout.prop.margin.bottom,
								t: layout.prop.margin.top,
								pad: 5
							},
							font: {
								family: qtheme.properties.fontFamily
							},
							showlegend: layout.legend.showLegend,
							legend: {
								bgcolor: 'rgba(0,0,0,0)',
								orientation: layout.legend.orientation
							},
							xaxis: {
								type: layout.xAxisSettings.type,
								tickformat: layout.xAxisSettings.tickFormat,
								showline: layout.xAxisSettings.showLine,
								showgrid: layout.xAxisSettings.showGrid,
								showticklabels: layout.xAxisSettings.showTicklabels,
								zeroline: layout.xAxisSettings.showZeroLine,
								linecolor: qtheme.getStyle('object', 'axis.line.major', 'color'),
								tickangle: 'auto',
								tickcolor: qtheme.getStyle('object', 'axis.line.major', 'color'),
								gridcolor: qtheme.getStyle('object', 'axis.line.major', 'color'),
								title: {
									text: layout.xAxisSettings.xTitle,
									font: {
										color: qtheme.getStyle('object', 'axis.title', 'color'),
										size: qtheme.getStyle('object', 'axis.title', 'fontSize')
									}
								},
								font: {
									color: qtheme.getStyle('object', 'axis.label.name', 'color'),
									size: qtheme.getStyle('object', 'axis.label.name', 'fontSize')
								},
								//20201201 cvh 2: add dynamic x axis (min and max)
								range: [minValxAxis, maxValxAxis]
								
								

								
								//20201201 cvh 2: end
							},
							yaxis: {
								type: layout.yAxisSettings.type,
								tickformat: layout.yAxisSettings.tickFormat,
								showline: layout.yAxisSettings.showLine,
								showgrid: layout.yAxisSettings.showGrid,
								showticklabels: layout.yAxisSettings.showTicklabels,
								zeroline: layout.yAxisSettings.showZeroLine,
								linecolor: qtheme.getStyle('object', 'axis.line.major', 'color'),
								tickangle: 'auto',
								tickcolor: qtheme.getStyle('object', 'axis.line.major', 'color'),
								gridcolor: qtheme.getStyle('object', 'axis.line.major', 'color'),
								title: {
									text: layout.yAxisSettings.yTitle,
									font: {
										color: qtheme.getStyle('object', 'axis.title', 'color'),
										size: qtheme.getStyle('object', 'axis.title', 'fontSize')
									}
								},
								title: layout.yAxisSettings.yTitle,
								font: {
									color: qtheme.getStyle('object', 'axis.label.name', 'color'),
									size: qtheme.getStyle('object', 'axis.label.name', 'fontSize')
								}
							}
						};

						// set rangeslider
						if(layout.xAxisSettings.showRangeslider) {
							graph_layout.xaxis.rangeslider = {
									
							bgcolor: '#f1f2f3',
							thickness: 0.05
							}
						}


						const datas = [];



						var i = 0;
						var color;
						var colorscale;

						if (tracesMap.size > 500) {
							$('#' + 'T_' + id).text('More than 500 colors. Reduce the number of color segments in the color config');
							return;

						}
						tracesMap.forEach(function (coords, key) {

							// Set Color for each trace
							if (layout.color.auto) {
								color = qtheme.properties.dataColors.primaryColor;
							}
							else if (layout.color.mode == "primary") {
								color = layout.color.paletteColor.color;
							
							
							} else if (layout.color.mode == "byDimension") {
								
								var scales = getDimensionColorPalette();

								color = scales[i % scales.length].trim();


							} else if (layout.color.mode == "byMeasure") {
								const palettes = qtheme.properties.scales.filter(scale =>
									scale.propertyValue == layout.color.measureScheme);

								color = coords[4];

								var scales;

								if (palettes.length == 1) {
									scales = palettes[0].scale;
								} else {
									scales = qtheme.properties.scales[0].scale;
								}

								if (Array.isArray(scales[1])) {
									// first scale is always "null"
									scales = scales[Math.min(color.length, scales.length - 1)];
								}

								var colorscale = [];
								scales.forEach(function (colorHex, index) {

									colorscale.push([index / (scales.length - 1), colorHex]);
								});

							} else if (layout.color.mode == "byExpression" && layout.color.expressionIsColor) {
								color = key;

							} else if (layout.color.mode == "byExpression" && !layout.color.expressionIsColor) {

								var scales = getDimensionColorPalette();
								if (layout.prop.colorPalette != null && layout.prop.colorPalette != '') {
									scales = layout.prop.colorPalette.split(",");
								} else {
									scales = getDimensionColorPalette();
								}

								color = scales[i % scales.length].trim();
							}

							function getDimensionColorPalette() {
								const palettes = qtheme.properties.palettes.data.filter(palette =>
									palette.propertyValue == layout.color.dimensionScheme);

								var scales;

								if (palettes.length == 1) {
									scales = palettes[0].scale;
								} else {
									scales = qtheme.properties.palettes.data[0].scale;
								}

								if (Array.isArray(scales[0])) {
									scales = scales[Math.min(tracesMap.size - 1, scales.length - 1)];
								}

								return scales;
							}


							const data = {
								type: "scattergl",

								mode: 'markers',
								name: key,


								showlegend: colorscale == null,
								marker: {
									color: color,
									/***********/
									// Relevant for color by Measure
									colorscale: colorscale,
									showscale: layout.legend.showLegend && colorscale != null,

									reversescale: layout.color.reverseScheme,
									colorbar: {
										thickness: 10,

										len: 0.90,
										tickformat: layout.coloring.numberFormat,
										outlinewidth: 0
										//autotick: false,
										//nticks: 2 
										/*autotick: false,
										tick0: 0,
										dtick: 0.1*/
									},
									/************/

									size: layout.prop.markerSize,
									opacity: layout.prop.markerOpacity,
									symbol: layout.prop.markerType,
									//20201201 cvh 1: commented due to border outside marker
									line: {
										width: layout.marker.lineWidth,
										color: layout.marker.lineColor.color
									}
									//20201201 cvh 1: end
								},
								x: coords[0],
								y: coords[1],
								text: coords[2],
								// numero di array = numero di punti x y
								//all'interno di ogni array tante voci quanti sono i tooltip
								//customdata: [['tooltip 1', 'tooltip 2'], ['tooltip 10']], //20201201 cvh 4: adding custom tooltip
								customdata: coords[5],
								qElementNumber: coords[3],
								textposition: "middle center",
								textfont: {
									color: qtheme.getStyle('object', 'axis.label.value', 'color'),
									size: qtheme.getStyle('object', 'axis.label.value', 'fontSize')
								},

								hoverlabel: {
									bgcolor: "#535353",
									align: "left",
									bordercolor: "#535353",
									font: {
										color: "#ffffff"
									}
								},

								hoverinfo: 'x+y+text',

								hovertemplate:
									tooltipLablesTop +
									(!layout.tooltip.auto && layout.tooltip.hideBasic ? '' :
										'<br><b>' + dimTitle + ': %{text}</b>' +
										'<br>' + meaX + ': %{x}' +
										'<br>' + meaY + ': %{y}'
										) //+

									+ tooltipLablesBottom +
									'<extra></extra>'									//20201201 cvh 4: adding custom tooltip
							}

							datas.push(data);
							i++;

						});



						layout.refLineList.forEach(function (lineData) {
							var lineArray;
							try {
								lineArray = JSON.parse('[' + lineData.line.geometry + ']');
							} catch (e) {
								console.info(e);
								lineArray = [];
							}
							var x = [];
							var y = [];
							var i = 0;

							lineArray.forEach(function (coord) {
								x.push(coord[0]);
								y.push(coord[1]);
								i++;
							});

							const line = {
								x: x,
								y: y,
								paper: 'paper',
								text: lineData.line.label,
								textposition: 'center right',
								mode: lineData.line.mode,
								type: 'scattergl',
								textfont: {
									color: qtheme.getStyle('object', 'axis.label.value', 'color'),
									size: qtheme.getStyle('object', 'axis.label.value', 'fontSize')
								},
								name: lineData.line.label,
								showlegend: lineData.line.showLegend,

								line: {
									dash: lineData.line.lineStyle,
									width: lineData.line.width,
									color: lineData.line.lineColor.color,
									shape: lineData.line.shape

								}
							};

							datas.push(line);


						});


						const shapeObjs = [];
						layout.shapes.forEach(function (shapeData) {

							var x0 = shapeData.shape.x0;
							var y0 = shapeData.shape.y0;
							var x1 = shapeData.shape.x1;
							var y1 = shapeData.shape.y1;

							if (shapeData.shape.refLine === 'h') {
								x0 = 0;
								x1 = 1;
							} else if (shapeData.shape.refLine === 'v') {
								y0 = 0;
								y1 = 1;
							}

							const shapeObj = {
								type: shapeData.shape.type,
								layer: shapeData.shape.layer,
								x0: x0,
								y0: y0,
								x1: x1,
								y1: y1,
								fillcolor: shapeData.shape.fillColor.color,
								opacity: shapeData.shape.opacity,
								line: {
									dash: shapeData.shape.lineStyle,
									width: shapeData.shape.width,
									color: shapeData.shape.fillColor.color
								}
							}


							if (shapeData.shape.refLine === 'v') {
								shapeObj.yref = 'paper'
							} else if (shapeData.shape.refLine === 'h') {
								shapeObj.xref = 'paper'
							}


							shapeObjs.push(shapeObj);
						});

						graph_layout.shapes = shapeObjs;


						let modeBarButtons = [["pan2d", "select2d", "lasso2d", "zoom2d", "resetScale2d"]];

						//20201201 cvh 3: including locations
						//Defualt language
						var lang = "en-US";
						//Browser language
						var userLang = (navigator.language || navigator.userLanguage).substring(0, 2);

						if (userLang != "en") {
							//Getting browser language. You need to include your language plotly js (e.g. plotly-locale-it.js)
							lang = userLang;
						}

						var config = {
							responsive: true,
							scrollZoom: true,
							displaylogo: false,
							modeBarButtons: modeBarButtons,
							locale: lang
						};
						//20201201 cvh 3: end


						var keysForSelection = Object.keys(datas);

						// Clean up if the chart already exists
						if (TESTER.data == null) {
							Plotly.react(TESTER, datas, graph_layout, config);

						} else {
							// remove all unneeded listeners because of selection performance
							TESTER.removeAllListeners("plotly_click");
							TESTER.removeAllListeners("plotly_selected");

							Plotly.react(TESTER, datas, graph_layout, config);
							self.$scope.selectedElements.clear();
							// resize is required for the div zoom in the QS client
							Plotly.Plots.resize(TESTER);

						}

						TESTER.on('plotly_click', function (eventData) {

							// on select reduce the opacity of all traces
							var update = {
								opacity: 0.4
							};
							Plotly.restyle(TESTER, update, keysForSelection);

							select(eventData, "click");

						});
						// select with rectangle and lasso
						TESTER.on('plotly_selected', function (eventData) {

							select(eventData);

						});


						// select on click
						function select(data, type) {

							var select = [];

							data.points.forEach(function (pt) {
								if (pt.data.qElementNumber != null) {
									var elements = pt.data.qElementNumber;
									var qElem = elements[pt.pointIndex];
									select.push(qElem);

									// Mark selected points 
									if (type === "click") {

										// remove created selection trace if point was allreay selected (select/un-select)
										if (self.$scope.selectedElements.has(qElem)) {
											var traceIndex = self.$scope.selectedElements.get(qElem);
											Plotly.deleteTraces(TESTER, traceIndex);
											self.$scope.selectedElements.delete(qElem);

										} else {

											// add new trace for every selected point
											var cloneMarker = JSON.parse(JSON.stringify(pt.data.marker));
											cloneMarker.line.width = cloneMarker.line.width + 1;
											var update = {

												x: [pt.x],
												y: [pt.y],
												type: 'scattergl',
												mode: 'markers',
												name: 'marker_selected',
												showlegend: false,
												marker: cloneMarker,
												qElementNumber: [qElem]

											};
											Plotly.addTraces(TESTER, update);
											self.$scope.selectedElements.set(qElem, TESTER.data.length - 1);

										}
									}
								}
							});

							if (select.length > 0) {
								// Qlik Sense selection action
								self.selectValues(0, select, true);
							}
						}

					}


					//loop through the rows we have and render
					function addtoArray() {
						//console.info("getRowCount" + self.backendApi.getRowCount());
						self.backendApi.eachDataRow(function (rownum, row) {
							//console.info("rownum " + rownum);
							lastrow = rownum;
							//do something with the row..

						});

					}

					function getMoreData() {

						return new Promise(resolve => {


							if (self.backendApi.getRowCount() > lastrow + 1 && lastrow <= layout.maxRecord) {

								//we havent got all the rows yet, so get some more, 1000 rows
								var requestPage = [{
									qTop: lastrow + 1,
									qLeft: 0,
									qWidth: 5, //should be # of columns
									qHeight: Math.min(2000, self.backendApi.getRowCount() - lastrow)
								}];
								self.backendApi.getData(requestPage).then(function (dataPages) {

									//console.log(" Page  lastrow........... "  + lastrow);
									//when we get the result trigger paint again
									addtoArray();
									resolve(getMoreData());

								});

							} else {
								resolve();
							}
						});
					}
				}
				catch (err) {
					console.info(err);
				}

				//needed for export
				return qlik.Promise.resolve();
			}
		};

	});



