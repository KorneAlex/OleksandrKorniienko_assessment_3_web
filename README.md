
# OleksandrKorniienko_Assessment_3_web

Assesment 3 web dev 2 by student Oleksandr Korniienko (20114792) SETU 2025


## Acknowledgements

 - [YAGI .gitignore generator addon](https://open-vsx.org/vscode/item?itemName=anhkhoakz.yagi)
 - [README editor](https://readme.so/ru/editor)

## Authors

- [@KorneAlex](https://github.com/KorneAlex)


## Run Locally

Clone the project

```bash
  git clone https://github.com/KorneAlex/OleksandrKorniienko_assessment_3_web.git
```

Go to the project directory

```bash
  cd OleksandrKorniienko_assessment_3_web
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Features

- Two account types:
    - Admin:
      - Can add, edit, delete and restore all stations and records
    - User:
      - Can add, edit, delete records added by them
      - Can delete their pulled data from the OpenWeather source, but cannot edit it
      - Can see only deleted records that were deleted by them (cannot see records created by user and deleted by admin)
- All deleted from the data base stations and records are moved to the separate file, so even if you "delete it forever" you still can restore it if copy it manually from one JSON to onother 
- Account page that allows user add their API keys to display map and pull data from OpenWeather resource
- Map that shows active stations with markers containing hyperlinks to those stations and descriprion showing the latest record information
- Data Chart displaying dynamics of Temperature and Wind Speed on the each station's page


- Cross platform

