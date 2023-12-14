/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
	address: "0.0.0.0",	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",			// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
					  		// you must set the sub path here. basePath must end with a /
	ipWhitelist: [],	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "nl",
	locale: "nl-BE",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
		},
		{
			module: "clock",
			position: "bottom_left",
			config: {
				displaySeconds: false,
				showDate: false,
				showTime: true
			}
		},
		{
			module: "MMM-MonthlyCalendar",
			position: "top_left",
			hiddenOnStartup: false,
			config: {
				mode: "threeWeeks",
				firstDayOfWeek: "monday",
				wrapTitles: false,
			}
		},
		{
  			module: "MMM-CalendarExt3Agenda",
  			position: "top_right",
			config: {
				useWeather: false,
				showMiniMonthCalendar: false,
				startDayIndex: 0,
				endDayIndex: 3,
				useWeather: true,
				eventTransformer: (e) => {
					if (e.title.search("Swim - ") > -1) {
						var distance = e.description.match(/Distance:(.*) km/)[1] * 1000
						e.title = ["Swim: ", distance, "m"].join('')
						e.description = null
  						return e
					}
					if (e.title.search("Run - ") > -1) {
						var duration = e.description.match(/Duration:(.*)/)[1]
						e.title = ["Run: ", duration].join('')
						e.description = null
  						return e
					}
					if (e.title.search("Bike - ") > -1) {
						var duration = e.description.match(/Duration:(.*)/)[1]
						e.title = ["Bike: ", duration].join('')
						e.description = null
  						return e
					}
					return e
				}
			}

		},
		{
			module: "calendar",
			position: "top_right",
			hiddenOnStartup: true,
			config: {
				fade: false,
				nextDaysRelative: true,
				sliceMultiDayEvents: true,
				flipDateHeaderTitle: true,
				coloredBackground: false,
				coloredText: true,
				coloredBorder: true,
				coloredSymbol: true,
				broadcastEvents: true,
				broadcastPastEvents: true,
				fetchInterval: 60000,
				hideDuplicates: true,
				displaySymbol: false,
				wrapEvents: false,
				maxTitleLength: 200,
				maximumEntries: 100,
				broadcastPastEvents: true,
				showEnd: false,
				dateFormat: "dddd DD/MM",
				timeFormat: "dateheaders",
				calendars: [
					{ 
						color: "#669bbc", // holidays
						url: "https://calendar.google.com/calendar/ical/..."
					},
					{
						color: "#5C80BC", //Sam
						url: "https://calendar.google.com/calendar/ical/..."
					},
					{
						color: "#739675", // BDV
						url: "https://calendar.google.com/calendar/ical/..."
					},
					{
						color: "#739675", // Home
						url: "https://calendar.google.com/calendar/ical/..."
					},
					{
						color: "#E9795D", //Marijke
						url: "https://calendar.google.com/calendar/ical/..."
					},
					{
						color: "#009ea3", // Noa
						url: "https://calendar.google.com/calendar/ical/..."
					},
					{
						color: "#D9596C", // Emmelien
						url: "https://calendar.google.com/calendar/ical/..."
					},
					{
						color: "#5C80BC", // Athletica
						url: "https://app.athletica.ai/..." 
					}
				]
			}
		},
		{ 
			module: "calendar",
			hiddenOnStartup: true,
			config: {
				fade: true,
				fadePoint: 0.5,
				nextDaysRelative: true,
				sliceMultiDayEvents: true,
				flipDateHeaderTitle: true,
				coloredBackground: false,
				coloredText: true,
				coloredBorder: true,
				coloredSymbol: true,
				broadcastEvents: true,
				broadcastPastEvents: true,
				fetchInterval: 60000,
				hideDuplicates: true,
				displaySymbol: false,
				wrapEvents: true,
				maxTitleLength: 20,
				maximumEntries: 100,
				broadcastPastEvents: true,
				showEnd: false,
				dateFormat: "dddd DD/MM",
				timeFormat: "dateheaders",
				calendars: [
					{
						color: "#ffa10a",
						url: "https://calendar.google.com/calendar/ical/..." // Weekmenu
					}
				]
			}
		},


		{
			module: "weather",
			position: "bottom_center",
			showPrecipitationProbability: true,
			config: {
				appendLocationNameToHeader: false,
				weatherProvider: "openmeteo",
				type: "current",
				windUnits: "kmh",
				showSun: false,
				showPrecipitationProbability: true,
				//showFeelsLike: false,
				apiBase: "https://api.open-meteo.com/v1",
				lat: "0.0",
				lon: "0.0",
				initialLoadDelay: 0
			}
		},
		{
			module: "newsfeed",
			position: "bottom_right",
			hiddenOnStartup: false,
			config: {
				feeds: [
					{
						title: "VRT",
						url: "https://www.vrt.be/vrtnws/nl.rss.articles.xml"
					},
					{	title: "De Morgen",
						url: "https://www.demorgen.be/in-het-nieuws/rss.xml"
					},
					{	title: "De Standaard - Binnenland",
						url: "https://www.standaard.be/rss/section/1f2838d4-99ea-49f0-9102-138784c7ea7c"
					},
					{	title: "De Standaard - Buitenland",
						url: "https://www.standaard.be/rss/section/e70ccf13-a2f0-42b0-8bd3-e32d424a0aa0"
					},
					{	title: "De Standaard - Economie",
						url: "https://www.standaard.be/rss/section/451c8e1e-f9e4-450e-aa1f-341eab6742cc"
					},
					{	title: "De Standaard - Sport",
						url: "https://www.standaard.be/rss/section/8f693cea-dba8-46e4-8575-807d1dc2bcb7"
					},
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: false,
				broadcastNewsUpdates: false,
				hideLoading: true,
				wrapDescription: true,
				wrapTitle: true,
				//maxNewsItems: 1,
				ignoreOldItems: true,
				updateInterval: 12000,
			}
		},
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
