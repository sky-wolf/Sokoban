/* let blocks = 0;
let inGoals = 0; */
let level = 1;

function Game() 
{
    let run;
    const grid = document.querySelector('#grid');
    CreateMap(tileMap01)
    document.addEventListener('keydown', InputPlayer);
    document.addEventListener('winning', () =>
    {
        if(confirm("Do you want to continue"))
        {
            level = level +1;

            if(level === 2)
            {
                CleanMap();
                CreateMap(tileMap02);
                return;
            }

            if(level === 3)
            {
                CleanMap();
                CreateMap(tileMap03)
                return;
            }

            if(level === 4)
            {
                CleanMap();
                const square = document.createElement('div');
                square.classList.add('gameover');
                square.innerHTML = "<h1>GAME OVER</h1>"
                grid.appendChild(square);
                return;
            }
        }else
        {
            CleanMap();
        }
    });
}

function CreateMap(tileMap) {
    
    for(let i = 0; i < tileMap.height; i++)
    {
        for (let j = 0; j < tileMap.width; j++) {
            let tile = tileMap.mapGrid[i][j][0];
            let index = i+'-'+j
            const square = document.createElement('div');
           
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
                square.classList.add(Entities.Block);
            }
            square.classList.add('square');
            grid.appendChild(square);
        }
    } 
}

function CleanMap() {
    for(let i = 0; i < tileMap01.height; i++)
    {
        for (let j = 0; j < tileMap01.width; j++) {
            let index = i+'-'+j
            document.getElementById(index).remove();
        }
    } 
}

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

   let nextXCoord = currPos.xCoord + x;
   let nextYCoord = currPos.yCoord + y;


   let nextPos = document.getElementById(nextXCoord + '-' + nextYCoord);
   let wall = nextPos.classList.contains(Tiles.Wall);
   let box = nextPos.classList.contains(Entities.Block);
   
    if(box)
    {
        let nextBoxXCoord = nextXCoord  + x;
        let nextBoxYCoord = nextYCoord + y;
    
        let divNextBoxPos = document.getElementById(nextBoxXCoord + '-' + nextBoxYCoord);

        let wall2 = divNextBoxPos.classList.contains(Tiles.Wall);
        let box2 = divNextBoxPos.classList.contains(Entities.Block);
        if(!wall2 && !box2)
        {
            let goal = divNextBoxPos.classList.contains(Tiles.Goal);

            divNextBoxPos.classList.add(Entities.Block);
            nextPos.classList.remove(Entities.BlockDone);
            nextPos.classList.remove(Entities.Block);
            nextPos.classList.add(Entities.Character);
            currPos.divCurrPos.classList.remove(Entities.Character);

            if(goal)
            {
                divNextBoxPos.classList.add(Entities.BlockDone);
            }
        }
    }else
    {
        if(!wall)
        {
            nextPos.classList.add(Entities.Character);
            currPos.divCurrPos.classList.remove(Entities.Character);
        }
    }
    Winning();
}

function FindPlayer()
{
    let divCurrPos = document.getElementsByClassName('entity-player')[0];
    let currPos = divCurrPos.id;

    let xCoord = Math.floor(currPos.split('-')[0]);
    let yCoord = Math.floor(currPos.split('-')[1]);

    return {
        xCoord,
        yCoord,
        divCurrPos
      }
}

function Winning()
{
    const blocks = document.querySelectorAll('.'+Entities.Block).length;
    const  inGoals = document.querySelectorAll('.'+Entities.BlockDone).length;

    if(blocks === inGoals)
    {
        const e = new Event("winning");
        const element = document.querySelector('#grid')
        document.dispatchEvent(e);
    }
}