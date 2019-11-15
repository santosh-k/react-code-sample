import React from 'react';
import {SectionList, View, Text, ImageBackground, Image} from 'react-native';
import {SafeAreaView} from 'react-navigation';

import Modal from 'react-native-modal';
import Toast from 'react-native-easy-toast';
import {
  BaseScreen,
  Divider,
  Header,
  FilterList,
  MyScheduleEmpty,
} from '../Components';
import {
  DayListItem,
  DayTabList,
  ScheduleProgramListItem,
} from '../Components/Program';

// Styles
import styles from './Styles/MyScheduleScreenStyle';

import I18n from '../I18n';
import {connect} from 'react-redux';
import {ProgramViewModel, ScheduleViewModel} from '../Data';
import WonderfruitActions, {
  WonderfruitSelectors,
} from '../Redux/WonderfruitRedux';
import {ApiUtils} from '../Utils';
import AlertPopup from '../Components/Alerts/AlertPopup';
import ButtonFA from '../Components/ButtonFA';
import colors from '../Themes/Colors';
import {Colors, Images} from '../Themes';
import DateUtils from '../Utils';

const categories = [
  {label: 'ALL', value: 'all'},
  {label: 'MUSIC', value: 'music'},
  {label: 'ART & ARCHITECTURE', value: 'art-architecture'},
  {label: 'FARM TO FEAST', value: 'farm-feast'},
  {label: 'WELLNESS', value: 'wellness'},
  {label: 'FAMILY', value: 'family'},
  {label: 'TALK & WORKSHOPS', value: 'talk-workshops'},
];

class MySchduleScreen extends BaseScreen {
  state = {
    selectedDate: I18n.t('date.day1'),
    appliedFilter: null,
    isFilterModalVisible: false,
    isModalVisible: false,
    isRemoveProgram: true,
    isRemoveProgramDialog: false,
    modalData: null,
  };

  render() {
    const {myschedules, myschedulesLookup} = this.props;
    const {appliedFilter, selectedDate} = this.state;

    return (
      <View style={styles.container}>
        {/*<Header title={I18n.t('myschedule.title')} onMenuPress={this.sideMenuToggle} onFilterPress={this.toggleFilterList} /> */}
        <DayTabList
          selectedDate={selectedDate}
          onPress={this.scrollToSection}
        />

        {ApiUtils.hasSections(myschedules) ? (
          this.renderSectionList()
        ) : (
          <MyScheduleEmpty
            onPress={this.navigateProgramScreen}
            onPressProgram={this.navigateProgramScreen}
            onPressLineUp={this.navigateLineUpScreen}
          />
        )}
        {this.state.isModalVisible ? (
          this.state.isRemoveProgramDialog ? (
            this.renderRemoveProgramAlertDialog()
          ) : (
            this.renderScheduleAlertDialog()
          )
        ) : (
          <View />
        )}
        <Toast
          ref={ref => (this.toast = ref)}
          position="center"
          style={styles.toast}
          textStyle={styles.toastText}
        />
        <Toast
          ref={ref => (this.toastAdded = ref)}
          position="center"
          style={[styles.toast, {backgroundColor: colors.blue3E}]}
          textStyle={styles.toastText}
        />
        <Modal
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          isVisible={this.state.isFilterModalVisible}
          onBackdropPress={this.toggleFilterList}
          style={styles.filterModal}>
          <FilterList
            options={categories}
            theme="myschedule"
            onSelectFilter={this.filterProgramList}
            onPressCancel={this.toggleFilterList}
          />
        </Modal>
      </View>
    );
  }

  renderScheduleAlertDialog = () => {
    return this.state.isRemoveProgram ? (
      <Modal isVisible={true}>
        <AlertPopup
          theme="remove"
          text={I18n.t('alert.removeProgram')}
          onPressConfirm={() => this.toggleModalPopup(true)}
          onPressCancel={() => this.toggleModalPopup(false)}
        />
      </Modal>
    ) : (
      <Modal isVisible={true}>
        <AlertPopup
          theme="subscribe"
          text={I18n.t('alert.subscribeProgram')}
          onPressConfirm={() => this.toggleModalPopup(true)}
          onPressCancel={() => this.toggleModalPopup(false)}
        />
      </Modal>
    );
  };

  renderRemoveProgramAlertDialog = () => {
    return (
      <Modal isVisible={true}>
        <AlertPopup
          theme="removeProgram"
          text={I18n.t('alert.removeFromScheduleProgram')}
          onPressConfirm={() => this.toggleModalPopup(true)}
          onPressCancel={() => this.toggleModalPopup(false)}
        />
      </Modal>
    );
  };

  renderSectionList = () => {
    const {myschedules, myschedulesLookup} = this.props;
    const {appliedFilter, selectedDate} = this.state;

    const filteredMyschedules = this.multipleFilteredProgram(
      myschedules,
      appliedFilter,
    );

    const programs = this.totalMyScheduledProgram(myschedules);

    return programs.length === 1 ? (
      <View style={styles.singleProgram}>
        <SectionList
          style={styles.list}
          ref={this.setListView}
          extraData={myschedulesLookup}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          ItemSeparatorComponent={this.sectionDivider}
          ListEmptyComponent={this.renderEmptyList}
          stickySectionHeadersEnabled
          sections={filteredMyschedules}
          onViewableItemsChanged={this.onViewableItemsChanged}
          initialNumToRender={30}
        />
        <ButtonFA
          style={styles.addMore}
          theme={'brownBE'}
          icon={'plus-circle'}
          text={I18n.t('myschedule.add_more')}
          onPress={this.navigateProgramScreen}
        />
      </View>
    ) : (
      <SectionList
        style={styles.list}
        ref={this.setListView}
        extraData={myschedulesLookup}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderSectionHeader}
        ItemSeparatorComponent={this.sectionDivider}
        ListEmptyComponent={this.renderEmptyList}
        stickySectionHeadersEnabled
        sections={filteredMyschedules}
        onViewableItemsChanged={this.onViewableItemsChanged}
        initialNumToRender={30}
      />
    );
  };

  keyExtractor = item => item.scheduleId;
  renderItem = ({item, index}) => (
    <ScheduleProgramListItem
      row={index}
      data={item}
      onPress={this.navigateToLineUp}
      onPressLocation={this.navigateToVenueId}
      hasAlert={this.props.alerts.indexOf(item.scheduleId) >= 0}
      added={this.isInSchedule(ScheduleViewModel.scheduleId(item))}
      onClickSwipeoutRemove={this.toggleSchedule}
      onClickSubscribe={this.toggleAlert}
      onClickUnSubscribe={this.toggleProgramAlert}
      theme="myschedule"
    />
  );

  renderSectionHeader = ({section}) => (
    <DayListItem date={section.title} theme="myschedule" />
  );
  renderEmptyList = () => (
    <MyScheduleEmpty
      onPress={this.navigateProgramScreen}
      onPressProgram={this.navigateProgramScreen}
      onPressLineUp={this.navigateLineUpScreen}
    />
  );

  setListView = view => {
    this.listView = view;
  };

  onViewableItemsChanged = ({viewableItems}) =>
    viewableItems[0] && this.setSelectedDate(viewableItems[0].section.title);

  setSelectedDate = selectedDate => this.setState({selectedDate});

  sectionDivider = () => <Divider style={styles.divider} />;

  scrollToSection = date => () => {
    const {myschedules} = this.props;
    if (!ApiUtils.hasSections(myschedules)) return;

    this.setSelectedDate(date);
    const location = ProgramViewModel.sectionLocation(date, myschedules);
    this.listView.scrollToLocation(location);
  };

  toggleFilterList = () => {
    this.setState({isFilterModalVisible: !this.state.isFilterModalVisible});
  };

  filterProgramList = filter => {
    this.setState({appliedFilter: filter});
  };

  toggleModalPopup = isConfirm => {
    const {isRemoveProgramDialog, isRemoveProgram, modalData} = this.state;

    if (isConfirm) {
      if (isRemoveProgramDialog) {
        this.toggleSchedule(modalData.scheduleId());
      } else {
        if (isRemoveProgram) {
          this.props.alertRemove(modalData.scheduleId());
          this.toast.show(I18n.t('toast.removeAlert'), 500);
        } else {
          this.props.alertAdd(modalData.scheduleId());
          this.toastAdded.show(I18n.t('toast.subscribeProgram'), 500);
        }
      }
    }

    this.setState({
      isModalVisible: !this.state.isModalVisible,
      isRemoveProgramDialog: false,
    });
  };

  toggleAlert = data => {
    var isAlert = false;
    if (this.props.alerts.indexOf(data.scheduleId()) >= 0) {
      isAlert = true;
    }
    this.setState({
      isRemoveProgram: isAlert,
      modalData: data,
      isRemoveProgramDialog: false,
    });
    this.toggleModalPopup(false);
  };

  toggleProgramAlert = data => {
    var isAlert = false;
    this.setState({
      isRemoveProgram: isAlert,
      isRemoveProgramDialog: true,
      modalData: data,
      isModalVisible: !this.state.isModalVisible,
    });
  };

  removeScheduleProgram = data => {
    this.setState({isRemoveProgram: true, modalData: data});
    this.toggleModalPopup(false);
  };

  subscribeScheduleProgram = data => {
    this.setState({isRemoveProgram: false, modalData: data});
    this.toggleModalPopup(false);
  };

  totalMyScheduledProgram = program => {
    return program.reduce((result, sectionData) => {
      const {data} = sectionData;

      if (data.length !== 0) {
        result = result.concat(data);
      }

      return result;
    }, []);
  };
}

const mapStateToProps = state => {
  return {
    lineupLookup: WonderfruitSelectors.getLineupLookup(state),
    myschedules: WonderfruitSelectors.getMySchedules(state),
    myschedulesLookup: WonderfruitSelectors.getMySchedulesLookup(state),
    alerts: WonderfruitSelectors.getMyAlerts(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    scheduleAdd: id => dispatch(WonderfruitActions.scheduleAdd(id)),
    scheduleRemove: id => dispatch(WonderfruitActions.scheduleRemove(id)),
    alertAdd: id => dispatch(WonderfruitActions.alertAdd(id)),
    alertRemove: id => dispatch(WonderfruitActions.alertRemove(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MySchduleScreen);
