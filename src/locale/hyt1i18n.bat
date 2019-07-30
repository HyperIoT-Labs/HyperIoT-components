@echo off 
IF EXIST "package.json" (
    echo ng xi18n on everything...
    echo.
    CALL ng xi18n --output-path src/locale --out-file translations.xlf || echo echo ERRORE && EXIT
    echo ngx-extractor on hyperiot...
    CALL npm run ngx-extractor -- -i "./projects/**/*.ts" -o "src/locale/translations.xlf" || echo echo ERRORE && EXIT
    echo.
    echo Finito
) ELSE (
    echo Non credo che sia una buona idea lanciarmi qui...
    echo.
    pause
)