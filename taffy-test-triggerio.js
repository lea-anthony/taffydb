/*
 This is a port of the standard TaffyDB tests to test the trigger.io 
 storage support.

 As trigger.io can run in a variety of environments, the tests have 
 been put in a function so that it can be called from the console of
 the debugging browser.

 Include within your trigger.io index.html page includes, switch to a
 debugging console and type "doTriggerIOTests()".
*/

function doTriggerIOTests() {
	doTriggerIOWriteTest();
	doTriggerIOReadTest();
}

function doTriggerIOWriteTest() {

	if( window.forge ) {

		forge.logging.log("------- Testing TriggerIO write support -------");

		var key_name, data_val, friends_table, taffy_map;
		friends_table = TAFFY();
		friends_table.settings({"useTriggerIO" : true});
		friends_table.store("trigger_test");
		friends_table.insert([
			{"id":1,"gender":"M","first":"John","last":"Smith","city":"Seattle, WA","status":"Active"},
			{"id":2,"gender":"F","first":"Kelly","last":"Ruth","city":"Dallas, TX","status":"Active"},
			{"id":3,"gender":"M","first":"Jeff","last":"Stevenson","city":"Washington, D.C.","status":"Active"},
			{"id":4,"gender":"F","first":"Jennifer","last":"Gill","city":"Seattle, WA","status":"Active"}  
		]);

		taffy_map = {
			t_by_city			: friends_table({city:"Seattle, WA"}),
			t_by_id				: friends_table({id:1}),
			t_by_id_f			: friends_table({id:'1'}),
			t_by_name			: friends_table({first:'John',last:'Smith'}),
			kelly_by_id			: friends_table({id:2}).first(),
			kelly_last_name	: friends_table({id:2}).first().last,
			id_list				: friends_table().select('id'),
			city_list				: friends_table().distinct('city')
		};

		for ( key_name in taffy_map ){
			if ( taffy_map.hasOwnProperty(key_name) ){
				data_val = taffy_map[key_name];
				forge.logging.log("key_name: " + key_name + ", data_val: " + data_val);
				if ( data_val.hasOwnProperty('get') ){
					forge.logging.log(JSON.stringify(data_val.get()));
				}
				forge.logging.log('-------------------------');
			}
		}
	} else {
			console.log("Trigger.IO Forge is not available.");
	}
}


function doTriggerIOReadTest() {

	if( window.forge ) {

		forge.logging.log("------- Testing TriggerIO read support -------");

		var key_name, data_val, friends_table, taffy_map;
		friends_table = TAFFY();
		friends_table.settings( { "useTriggerIO" : true } );
		friends_table.store( "trigger_test" );

		// Wait 2s for the DB to load
		setTimeout(function() {

			taffy_map = {
				t_by_city			: friends_table({city:"Seattle, WA"}),
				t_by_id				: friends_table({id:1}),
				t_by_id_f			: friends_table({id:'1'}),
				t_by_name			: friends_table({first:'John',last:'Smith'}),
				kelly_by_id			: friends_table({id:2}).first(),
				kelly_last_name	: friends_table({id:2}).first().last,
				id_list				: friends_table().select('id'),
				city_list				: friends_table().distinct('city')
			};

			for ( key_name in taffy_map ){
				if ( taffy_map.hasOwnProperty(key_name) ){
					data_val = taffy_map[key_name];
					forge.logging.log("key_name: " + key_name + ", data_val: " + data_val);
					if ( data_val.hasOwnProperty('get') ){
						forge.logging.log(JSON.stringify(data_val.get()));
					}
					forge.logging.log('-------------------------');
				}
			}

			ls = TAFFY();
			ls.store( "trigger_test" );
			// Wait 2s for the DB to load
			setTimeout(function() {
				forge.logging.log( ' localstorage "trigger_test" database contains:' );
				forge.logging.log( "  --> " + JSON.stringify(ls().get()) );
			},2000);

			
			ts = TAFFY();
			ts.settings( { "useTriggerIO" : true } ); 
			ts.store( "trigger_test" );
			// Wait 2s for the DB to load
			setTimeout(function() {
				forge.logging.log(' trigger.io storage "trigger_test" database contains:');
				forge.logging.log( "  --> " + JSON.stringify(ts().get()) );
			}, 2000);
			
		},2000);		
	} else {
			forge.logging.log("Trigger.IO Forge is not available.");
	}
}