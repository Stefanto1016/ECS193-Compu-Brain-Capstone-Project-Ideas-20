function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}


class Queue 
{
    constructor() 
    {
        this.arr = [];
        this.size = 0;
    }


    enqueue(object) 
    {
        this.arr[this.size] = object;
        this.size += 1;
    }


    dequeue() 
    {
        if(this.size == 0)
        {
            return(null);
        }
        var newArr = [];
        var output = this.arr[0];
        for(let i = 1; i < this.size; i++)
        {
            newArr.push(this.arr[i]);
        }
        this.arr = newArr;
        this.size -= 1;
        output.alert();
        return(output);
    }


    getSize() 
    {
        return this.size;
    }


    isEmpty() 
    {
        return this.size == 0;
    }

    async run()
    {
        while(1)
        {
            await sleep(50);
            var alert = this.dequeue();
            if(alert != null)
            {
                while(alert.alerted == 1)
                {
                    await sleep(50);
                }
            }
        }
    }
}

function createQueue()
{
    return(new Queue());
}

class Alert
{
    constructor()
    {
        this.alerted = 0;
    }

    alert()
    {
        this.alerted = 1;
    }

    unalert()
    {
        this.alerted = 0;
    }
}


function createAlert()
{
    return(new Alert());
}

module.exports = 
{
     createQueue, createAlert
}


