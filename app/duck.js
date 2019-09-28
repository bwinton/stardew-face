import document from "document";

export class Duck {
	constructor(id, collisionMap) {
		this.id = id;

		this.collisionMap = collisionMap;

		this.nextMovement = new Date();
		this.isMustMove = false;
		this.futurePosition = { 'x': 0, 'y': 0 };
		this.futureDirection = 0;
		
		this.facingDirection = Math.floor(Math.random() * Math.floor(2));

		this.element = document.getElementById( "duck" +
			id );
		this.elementTransform = [
			document.getElementById( "duckTransformUp" +
				id ),
			document.getElementById( "duckTransformDown" +
				id ),
			document.getElementById( "duckTransformRight" +
				id ),
			document.getElementById( "duckTransformLeft" +
				id ),
		];

		do {
			this.position = {
				'x': Math.floor(Math.random() * Math.floor(20)),
				'y': Math.floor(Math.random() * Math.floor(20)),
			};
		} while( collisionMap[ this.position.y ][ this.position.x ] === 0 );

		this.element.href = "duck/" +
			( this.facingDirection === 0 ?
				"left.png" :
				"right.png" );
	}

	PrepareMove( duckArray ) {
		let translation = { 'x': 0, 'y': 0 };

		let direction = Math.floor(Math.random() * Math.floor(4));

		if( direction === 1 ||
			direction === 2 ) {
			this.element.href = "duck/right.png";
			this.facingDirection = 1;
		} else {
			this.element.href = "duck/left.png";
			this.facingDirection = 0;
		}

		switch( direction ) {
			default:
			case 0:
				translation.y = -1;
				break;
			case 1:
				translation.y = 1;
				break;
			case 2:
				translation.x = 1;
				break;
			case 3:
				translation.x = -1;
				break;
		}

		let futurePosition = { 'x': this.position.x + translation.x, 'y': this.position.y + translation.y };
		if( futurePosition.x < 0 ||
			futurePosition.x >= 20 ||
			futurePosition.y < 0 ||
			futurePosition.y >= 20 ||
			this.collisionMap[ futurePosition.y ][ futurePosition.x ] !== 1 ) {
			return;
		} else {
			for( let currentDuckIndex = 0; currentDuckIndex < duckArray.length; currentDuckIndex++ ) {
				if( duckArray[ currentDuckIndex ].position.x === futurePosition.x &&
					duckArray[ currentDuckIndex ].position.y === futurePosition.y ) {
					return;
				}
			}
		}

		this.isMustMove = true;
		this.futurePosition = futurePosition;
		this.futureDirection = direction;
	};

	Move( ) {
		this.isMustMove = false;

		this.elementTransform[ this.futureDirection ].animate("enable");

		this.position.x = this.futurePosition.x;
		this.position.y = this.futurePosition.y;
	}

	Update( date,
		duckArray,
		baseMapPosition ) {
		this.element.x = baseMapPosition.x + this.position.x * 32;
		this.element.y = baseMapPosition.y + this.position.y * 32;

		if( date.getHours( ) > 19 ||
			date.getHours( ) < 7 ) {
			this.element.href = ( this.facingDirection === 0 ? "duck/sleepLeft.png" : "duck/sleepRight.png" );
			return;
		}
		
		if( this.isMustMove ) {
			this.Move( );
		} else if( this.nextMovement === null ||
			date > this.nextMovement ) {
			this.PrepareMove( duckArray );
			this.nextMovement = new Date( date.getTime( ) + ( 5000 + Math.floor(Math.random() * Math.floor(10000) ) ) );
		}
	};
}
