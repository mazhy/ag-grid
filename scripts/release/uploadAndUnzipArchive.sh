#!/bin/bash

if [ "$#" -lt 1 ]
  then
    echo "You must supply a release version"
    echo "For example: ./scripts/release/uploadAndUnzipArchive.sh 19.1.2"
    exit 1
fi

function checkFileExists {
    file=$1
    if ! [[ -f "$file" ]]
    then
        echo "File [$file] doesn't exist - exiting script.";
        exit 1;
    fi
}

VERSION=$1

export CREDENTIALS_LOCATION=$HOME/$CREDENTIALS_FILE
export SSH_LOCATION=$HOME/$SSH_FILE

# a few safety checks
if ! [[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]
then
    echo "Version isn't in the expected format. Valid format is: Number.Number.number. For example 19.1.2";
    exit 1;
fi

if [ -z "$CREDENTIALS_LOCATION" ]
then
      echo "\$CREDENTIALS_LOCATION is not set"
      exit 1;
fi

if [ -z "$SSH_LOCATION" ]
then
      echo "\$SSH_LOCATION is not set"
      exit 1;
fi

ARCHIVE="archive_`date +%Y%m%d`_$VERSION.tar.gz"

# $3 is optional skipWarning argument
if [ "$2" != "skipWarning" ]; then
    while true; do
        echo    "*********************************** WARNING ************************************************"
        read -p "This script will DELETE the existing archive of $VERSION (if it exists) and will REPLACE it. Do you wish to continue [y/n]? " yn
        case $yn in
            [Yy]* ) break;;
            [Nn]* ) exit;;
            * ) echo "Please answer [y]es or [n]o.";;
        esac
    done
fi

# delete dir if it exists - can ignore dir not found error
ssh -i $SSH_LOCATION -p 2022 ceolter@ag-grid.com "cd public_html/archive/ && rm -r $VERSION"

# upload file
curl --netrc-file $CREDENTIALS_LOCATION --ftp-create-dirs -T $ARCHIVE ftp://ag-grid.com/$VERSION/

##unzip archive
ssh -i $SSH_LOCATION -p 2022 ceolter@ag-grid.com "cd public_html/archive/$VERSION && tar -m -xf $ARCHIVE"


#update folder permissions (default is 777 - change to 755)
ssh -i $SSH_LOCATION -p 2022 ceolter@ag-grid.com "chmod -R 755 public_html/archive/$VERSION"

