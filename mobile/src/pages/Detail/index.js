import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';

import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import style from './style';

export default function Detail()
{
    const navigation = useNavigation();
    const route = useRoute();

    const incidents = route.params.incidents;
    const message = `Olá ${ incidents.name }, estou entrando em contato pois gostaria de ajudar no caso ' ${ incidents.title } ' !`;

    function navigateBack()
    {
        navigation.goBack();
    }

    function sendMail()
    {
        MailComposer.composeAsync({
            subject: `Herói de caso: ${ incidents.title }`,
            recipients: [incidents.email],
            body: message,
        });
   
    }

    function sendWhatsapp()
    {
        Linking.openURL(`whatsapp://send?phone=${incidents.whatsapp}&text=${message}`);
    }

    return (
        <View 
            style={style.container}>
                
                <View 
                style={ style.header }>

                <Image 
                    source={ logoImg }>
                </Image>

                <TouchableOpacity onPress={navigateBack}>
                <Feather 
                    name="arrow-left" 
                    size={28} 
                    color="#E02041"/>
            </TouchableOpacity>

            
            </View>

            
            <View 
                    style={ style.incident }>
  
                      <Text 
                          style={ [style.incidentProperty, { marginTop: 0 }]}>
                          ONG
                      </Text>
  
                      <Text 
                          style={ style.incidentValue}>
                          { incidents.name } de { incidents.city} / { incidents.uf }
                      </Text>
  
                      <Text 
                          style={ style.incidentProperty}>
                          CASO
                      </Text>
  
                      <Text 
                          style={ style.incidentValue}>
                          { incidents.title }
                      </Text>
            </View>

            <View 
                style={ style.contactBox }>

                    <Text 
                        style={ style.heroTitle }>

                        Salve o dia!

                    </Text>

                    <Text 
                        style={ style.heroTitle }>

                        Ajude-nos nesse caso. Faça sua contribuição!
                        
                    </Text>

                    <Text 
                        style={ style.heroDescription }>

                        Entre em contato:
                        
                    </Text>

            <View 
                style={ style.actions }>
                    
                    <TouchableOpacity
                        style={ style.action}
                        onPress={sendWhatsapp}>
                            <Text 
                                style={ style.actionText }>
                                    Whatsapp
                                </Text>
                        </TouchableOpacity>

                    <TouchableOpacity
                        style={ style.action}
                        onPress={sendMail}>
                            <Text 
                                style={ style.actionText }>
                                    E-mail
                                </Text>
                        </TouchableOpacity>

            </View>

            </View>

        </View>
    );
}