
const grid = document.querySelector('#grid');
document.addEventListener('keydown', InputPlayer);
function CreateMap() {
    for(let i = 0; i < tileMap01.height; i++)
    {
        for (let j = 0; j < tileMap01.width; j++) {
            let tile = tileMap01.mapGrid[i][j][0];
            let index = i+'-'+j
            const square = document.createElement('div');
            /* square.setAttribute('id', index); */
            square.id = index;
            square.classList.add(Tiles.Space);

            if(tile === 'W')
            {
                square.classList.remove(Tiles.Space);
                square.classList.add(Tiles.Wall);
            }
            else if(tile === 'G')
            {
                square.classList.add(Tiles.Goal);
            }
            else if(tile === 'P')
            {
                square.classList.add(Entities.Character);
            }
            else if(tile === 'B')
            {
                square.classList.remove(Tiles.Space);
                square.classList.add(Entities.Block);
            }
            square.classList.add('square');
            grid.appendChild(square);
        }
    }   
}
CreateMap();

function InputPlayer(e) {
    e.preventDefault();
    switch (e.key) {
        case 'ArrowUp':
            MovePlayer(-1,0);
            break;
        case 'ArrowDown':
            MovePlayer(1,0);
            break;
        case 'ArrowLeft':
            MovePlayer(0,-1);
            break;
        case 'ArrowRight':
            MovePlayer(0,1);
            break;
        
        
    
        default:
            break;
    }
}

function MovePlayer(x,y)
{
   let currPos = FindPlayer();
   /* console.log(x + ',' + y) */
   let nextXCoord = currPos.xCoord + x;
   let nextYCoord = currPos.yCoord + y;
   /* console.log(nextXCoord + ',' + nextYCoord) */

   let nextPos = document.getElementById(nextXCoord + '-' + nextYCoord);
   let wall = nextPos.classList.contains(Tiles.Wall);
   let box = nextPos.classList.contains(Entities.Block);
   console.log(box)
   /* if(!wall)
   { */

        nextPos.classList.add(Entities.Character);
        currPos.divCurrPos.classList.remove(Entities.Character);
        if(box)
        {
            FindBox(x, y, nextXCoord, nextYCoord);
            console.log('box')
        }

   
}

function FindPlayer()
{
    let divCurrPos = document.getElementsByClassName(Entities.Block)[0];
    let currPos = divCurrPos.id;
    /* console.log(currPos) */
    let xCoord = Math.floor(currPos.split('-')[0]);
    let yCoord = Math.floor(currPos.split('-')[1]);
    /* console.log(xCoord + ',' + yCoord) */
    return {
        xCoord,
        yCoord,
        divCurrPos
      }
}

function MoveBox(x, y, xCoord, yCoord)
{
    let divCurrPos = document.getElementById(xCoord + '-' + yCoord);
    
    let nextXCoord = xCoord + x;
    let nextYCoord = yCoord + y;
    
    let divNextPos = document.getElementById(nextXCoord + '-' + nextYCoord);


    divNextPos.add(Entities.Block);
    divCurrPos.classList.remove(Entities.Block);
}