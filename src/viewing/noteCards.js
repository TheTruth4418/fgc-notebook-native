import React from "react"
import { Text, View } from "react-native"

export const noteCards = (data) => {
    let arr = []
    data.forEach(note => {
        let points = []
        if(note.bullet_points){
            note.bullet_points.forEach(point => {
                points.push(
                    <View key={point.description}>
                        <Text>{point.description}</Text>
                    </View>
                )
            })
        }
        arr.push(<View key={`${note.title}`}>
            <Text>{note.title}</Text>
            {points}
            <Text>{"\n"}</Text>
        </View>)
    })
    if(arr.length !=0){
        return(arr)
    } else {
        return('No notes found for credentials')
    }
}