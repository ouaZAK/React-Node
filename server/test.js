let i = 3;
let count = 0;
let mod = 6;
let dir = true;
while (i % mod)
{
    dir ? i++ : i--;
    if (i === 6)
    {
        i = 1;
        count++;
    }
    else if (i === 0)
    {
        i = 5;
        count++;
    }
    if (count == 2)
        break;
}