#! /bin/bash

PRO_CFG_FILE_PATH=/wwwroot/sp/production.js
echo "/* SonPhat Product Publish Config */" | tee $PRO_CFG_FILE_PATH
for cfg in $(env); do
    if [[ $cfg == WebFE_* ]]; then
        echo "SP[\`$(echo $cfg | cut -d '=' -f1 | cut -c7-128)\`] = $(echo $cfg | cut -d '=' -f2-256);" | tee -a $PRO_CFG_FILE_PATH;
    fi;
done;
echo "/* SonPhat Product Publish Config */" | tee -a $PRO_CFG_FILE_PATH
