# μTrello

## Monitoring
cAdvisor -> Prometheus -> Grafana

* cAdvisor: http://localhost:3002/
* Prometheus: http://localhost:3001/
* Grafana http://localhost:3000/

cAdvisor exposes /metrics endpoint -> 
Prometheus reads the cAdvisor endpoint periodically and stores the data in its included TSDB ->
Grafana can query data from the Prometheus TSDB
 
