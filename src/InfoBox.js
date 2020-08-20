import React from 'react'
import {Card,CardContent,Typography} from "@material-ui/core";

function InfoBox({title,cases,total}) {
    return (
        <div>
            <Card>
               <CardContent>
                        <Typography className="infoBox_Title" color="textSecondary">
                            {title}

                         </Typography> 
                         <h2 className="infoBox_Cases">{cases} </h2>
                         <Typography className="infoBox_Total" color="textSecondary">
                            {total} Total Cases

                         </Typography> 
 
                </CardContent> 
            </Card>
        </div>
    )
}

export default InfoBox
