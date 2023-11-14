/*
	edp24 - ad stripper.
*/

const getnodes=function( expr, parent ){
	let results=[];
	let contextNode=parent || document;
	let query=document.evaluate( expr, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	for ( let i=0, length=query.snapshotLength; i < length; ++i ) {
		results.push( query.snapshotItem( i ) );
	}
	return results;
};

const querydom=function( expr, parent, nsrules=false ){
	let results=[];
	let contextNode=parent || document;
	
	let nsResolver=function( prefix ){
		switch( prefix ){
			case 'tsi':			return 'http://www.treksafe.co.uk/xmlschemas/GpxExtensions/v1';
			case 'gpxx':		return 'http://www.garmin.com/xmlschemas/GpxExtensions/v3';
			case 'gpxtrkx':		return 'http://www.garmin.com/xmlschemas/TrackStatsExtension/v1';
			case 'wptx1':		return 'http://www.garmin.com/xmlschemas/WaypointExtension/v1';
			case 'gpxtpx':		return 'http://www.garmin.com/xmlschemas/TrackPointExtension/v1';
			case 'xsi':			return 'http://www.w3.org/2001/XMLSchema-instance';
			case 'viewranger':	return 'http://www.viewranger.com/xmlschemas/GpxExtensions/v2';
			case 'gpx_style':	return 'http://www.topografix.com/GPX/gpx_style/0/2';
			case 'gpx':			return 'http://www.topografix.com/GPX/1/1';
			case 'g':			return 'http://www.topografix.com/GPX/1/1';
			case 'dc':			return 'http://purl.org/dc/elements/1.1/';
			case 's':			return 'http://www.w3.org/2000/svg';
		}
		
		if( nsrules ){
			let ns=false;
			Object.keys( nsrules ).some( key => {
				if( prefix==key ){
					ns=nsrules[key];
					return true;
				}
			});
			return ns;
		}
	}
	let query=document.evaluate( expr, contextNode, nsResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	for ( let i=0, length=query.snapshotLength; i < length; ++i ) {
		results.push( query.snapshotItem( i ) );
	}
	return results;
};

const exprs=[
	'//div[@id="BlockArticleContainer"]/div[contains( @class,"mar-block-ad--leaderboard")]',
	'//div[ contains( @class, "mar-block-ad--leaderboard" ) ]'
].filter(n=>n!='');


const emojis={
	expletive:0x1F631,
	alien:0x1F47D,
	pooh:0x1F4A9,
	skull:0x2620,
	seeevil:0x1F648,
	hearevil:0x1F649,
	spkevil:0x1F64A,
	santa:0x1F385,
	watch:0x231A,
	clock:0x23F0,
	snowman:0x26C4,
	snow:0x2744,
	tongue:0x1F61C,
	smirk:0x1F60F,
	unamused:0x1F612,
	hearteyes:0x1F60D,
	wink:0x1F609,
	rofl:0x1F602,
	cry:0x1F622,
	scream:0x1F631,
	ant:0x1F41C
};



console.clear();
console.log( `EDP24 ad stripper...` );


/*
Object.keys( emojis ).forEach(key=>{
	console.log( '%c%s', 'color:red;font-size:2rem;', String.fromCodePoint( emojis[ key ] ) )
})
*/


setTimeout(()=>{
	exprs.forEach( expr=>{
		let col=getnodes( expr );
		if( col && col.length > 0 ){
			for( let i=0; i < col.length; i++ ){
				console.log( '%c%s%cRemoving:%c%s', 'color:red;font-size:1.25rem;margin:0.5rem;',String.fromCodePoint( emojis.pooh ),'color:black','color:blue', col[i] );
				col[ i ].parentNode.removeChild( col[ i ] )
			}
		}
	})
},1500);

















