<div style="display: inline-flex; align-items: center; justify-content: center; margin: 0 auto;">
    <img src="https://webassembly.org/css/webassembly.svg" width="150">
    <img src="https://raw.githubusercontent.com/apache/arrow-datafusion/master/docs/source/_static/images/DataFusion-Logo-Background-White.svg" width="150">
</div>

DataFusion Playground
---------------------

Playground of [Apache Arrow DataFusion](https://github.com/apache/arrow-datafusion) with [WebAssembly](https://webassembly.org). In the early experimental stage as my side project.

🌱 Live Demo: https://waynexia.github.io/datafusion-playground/

## Features

- Cloud storage support: HTTP, AWS S3 (Google Cloud Storage and Azure Blob Storage are on the way)
- Full functional DataFusion query engine.
- Data formats: CSV, Parquet, JSON, Avro

## Screenshot

![Screenshot](./src/assets/datafusion-playground-demo.png)

## Examples

Create an external table from S3 parquet file:

```sql
CREATE EXTERNAL TABLE test STORED AS PARQUET
LOCATION 's3://path-to-your.parquet';
```

Explain a query:

```sql
EXPLAIN SELECT MIN(airport_fee), MAX(airport_fee) FROM test;
```
