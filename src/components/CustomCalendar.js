import React from 'react'
import moment from 'moment' // 2.20.1
import { View } from 'react-native' // 0.0.1
import { Calendar } from 'react-native-calendars' // 1.16.1


const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(365, 'days').format(_format)

class CustomCalendar extends React.Component {
  // It is not possible to select some to current day.
  initialState = {
      [_today]: {disabled: true}
  }
  
  constructor() {
    super();

    this.state = {
      _markedDates: this.initialState,
      selectedDates:[]
    }
  }
  componentDidUpdate(){
    // console.log('_markedDates',this.state._markedDates)
  }
  
  onDaySelect = (day) => {
    //console.log('this.onDaySelect',day)
      const _selectedDay = moment(day.dateString).format(_format);
      
      let selected = true;
      if (this.state._markedDates[_selectedDay]) {
        // Already in marked dates, so reverse current marked state
        selected = !this.state._markedDates[_selectedDay].selected;
      }
      
      
      // Create a new object using object property spread since it should be immutable
      // Reading: https://davidwalsh.name/merge-objects
      const updatedMarkedDates = {...this.state._markedDates, ...{ [_selectedDay]: { selected } } }

      const updatedSelectedDates = [...this.state.selectedDates,...[_selectedDay]]
      console.log('updatedSelectedDates',updatedSelectedDates)
     // console.log('updatedMarkedDates',updatedMarkedDates)


      

      this.setState({ selectedDates: updatedSelectedDates }) //simple value

     // console.log('this.state.selectedDates',this.state.selectedDates)
    //  console.log('this.state._markedDates',this.state._markedDates)

     
      this.props.setMultiSelectedDates(updatedSelectedDates)





      
      // Triggers component to render again, picking up the new state
      this.setState({ _markedDates: updatedMarkedDates });
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <Calendar
            
            // we use moment.js to give the minimum and maximum dates.
            minDate={_today}
            maxDate={_maxDate}

            // hideArrows={true}

            onDayPress={this.onDaySelect}
            markedDates={this.state._markedDates}
        />
      </View>
    );
  }
}

export default CustomCalendar
