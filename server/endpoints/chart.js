const { readFileSync: read } = require('fs');
module.exports = async (req, res) => {
    function debug(x) {
        console.log(x)
        return x;
    }

    const textParam = debug(req.url.split("?text="))[1].replace(/%([A-Za-z0-9]{2})/g, (match) => String.fromCharCode(Number.parseInt(match, 16))).replace(/\+/g, " ").trim();
    console.log(textParam);

    html = read("./client/chart.html") + "";
    html = html.replace("<!-- placeHolder0 -->", textParam ?
        `<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script type="text/javascript">
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);
    
            function drawChart() {
    
                var data = google.visualization.arrayToDataTable(${((string) => {
            output = {};

            output['Task'] = 'Hours per Day';

            chars = [...string];
            chars.forEach(char => {
                if (!output[char]) output[char] = 1;
                output[char]++;
            });

            output = JSON.stringify(Array.from(Object.entries(output)));

            console.log(output);
            return output;
        })(textParam)
        });
    
                var options = {
                    title: 'My Daily Activities'
                };
    
                var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    
                chart.draw(data, options);
            }
        </script>`
        : null).replace("<!-- placeHolder1 -->", textParam ? textParam : null);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(html);
    res.end();
};