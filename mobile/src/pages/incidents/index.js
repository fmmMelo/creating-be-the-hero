import React, {  useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation }from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity, ScrollView, RefreshControl, SafeAreaView } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import style from './style';

export default function Incidents()
{

    const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState();
    const navigate = useNavigation(false);

    function navigateToDetail(incidents)
    {
        navigate.navigate('Detail', { incidents });
    }

    async function loadIncidents()
    {

        if(loading)
        {
            return;
        }

        if(total > 0 && incidents.length === total)
        {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', { 
            params: { page }
        });

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);

    }

    useEffect(() => {
        loadIncidents();
    }, []);


    return(
            <View 
                style={ style.header }>

                <Image 
                    source={ logoImg }>
                </Image>

                <Text 
                    style={ style.headerText }>
                        Total de { incidents.length } casos.
                </Text>
            
            </View>

                <Text 
                    style={ style.title }>
                        Bem-vindo!
                </Text>

                <Text 
                    style={ style.description }>
                        Escolha um dos casos blah blah...
                </Text>

            <FlatList 
                data={incidents}
                style={ style.incidentList }
                keyExtractor={ incident => String(incident.id) }
                showsVerticalScrollIndicator={ false }
                onEndReached= { loadIncidents }
                onEndReachedThreshold = { 0.2 }
                renderItem={({ item: incident }) => (
                    <View 
                    style={ style.incident }>
  
                      <Text 
                          style={ style.incidentProperty}>
                          ONG
                      </Text>
  
                      <Text 
                          style={ style.incidentValue}>
                         { incident.name } de { incident.city } / { incident.uf }
                      </Text>
  
                      <Text 
                          style={ style.incidentProperty}>
                          CASO
                      </Text>
  
                      <Text 
                          style={ style.incidentValue}>
                          { incident.title }
                      </Text>
  
                      <TouchableOpacity 
                          style={ style.detailsButton}
                          onPress={() => navigateToDetail(incident)}>
  
                          <Text style={ style.detailsButtonText }>
                              Ver mais detalhes
                            </Text>

                          <Feather 
                              name="arrow-right" 
                              size={16} 
                              color="#E02041" />
                      </TouchableOpacity>
  
                  </View>
  
                )}/>
        </View>
    );
}