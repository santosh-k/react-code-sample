import Images from '../Themes/Images';
import ScheduleViewModel from './ScheduleViewModel';
import {ApiUtils, TextUtils} from '../Utils';
import ShareViewModel from './ShareViewModel';

export default class ProgramViewModel {
  constructor(model) {
    this.model = model;
  }

  id = () => ApiUtils.id(this.model);
  content = () => ApiUtils.value(this.model, ['content', 'rendered'], '');
  related = () => this.model.wf_activity_related_section;
  displayTime = () => ProgramViewModel.displayTime(this.model);
  hasSchedules = () => this.schedules().length > 0;
  isBookable = () => {
    var s = this.schedules();
    for (var i=0; i<s.length; i++) {
      if (s[i].bookable && s[i].total_seats > 0) {
        return true;
      }
    }
    return false;
  }
  image = () => this.model.picture_source;
  imageUrl = () => ApiUtils.imageUrl(this.image(), this.placeholder());
  thumbnailUrl = () =>
    ApiUtils.imageUrl(this.model.picture_source_small, this.placeholder());
  location = () => this.model.location.toUpperCase();
  pillar = () => ProgramViewModel.pillar(this.model).toUpperCase();
  timeRange = () => this.model.time;
  placeholder = () => {
    switch (this.pillar()) {
      case 'ARTS':
        return Images.placeholder_pillar_arts;
      case 'FAMILY':
        return Images.placeholder_pillar_family;
      case 'FARM TO FEASTS':
        return Images.placeholder_pillar_farm;
      case 'MUSIC':
        return Images.placeholder_pillar_music;
      case 'TALKS & WORKSHOPS':
        return Images.placeholder_pillar_talks;
      case 'WELLNESS & ADVENTURES':
        return Images.placeholder_pillar_wellness;
    }

    return Images.placeholder_pillar_arts;
  };
  scheduleId = () => ScheduleViewModel.scheduleId(this.model);
  schedules = () => ProgramViewModel.schedules(this.model);
  shareData = () =>
    new ShareViewModel(
      this.title(),
      this.content(),
      this.model.link,
      this.image(),
    );
  slug = () => ApiUtils.value(this.model, ['slug'], '');
  price = () => ApiUtils.value(this.model, ['wf_price'], 0);
  

  time = () => ProgramViewModel.date(this.model).substr(11, 5);
  title = () => ApiUtils.title(this.model);
  venueId = () => this.model.venueId;
  dateSchedule = (timezoneOffset = '+07:00') =>
    Object.values(this.model.wf_schedule)[0].substr(0, 19) + timezoneOffset;

  static date = model => ApiUtils.value(model, ['date'], '');
  static pillar = model =>
    TextUtils.htmlDecode(ApiUtils.value(model, ['pillar'], ''));
  static schedules = model =>
    ScheduleViewModel.parseSchedules(
      ApiUtils.value(model, ['wf_schedule'], {}),
      ApiUtils.value(model, ['bookings'], []),
      
    );

  static dateSchedule = program => ProgramViewModel.date(program).substr(0, 16);
  static displayTime = program => program.displayTime || false;
  static sectionDate = program => ProgramViewModel.date(program).substr(0, 10);
  static sectionPillar = program => ProgramViewModel.pillar(program);
  static sectionPillarImage = pillar => {
    switch (TextUtils.toUpper(pillar)) {
      case 'ARTS':
        return Images.lineup_pillar_arts;
      case 'FAMILY':
        return Images.lineup_pillar_family;
      case 'FARM TO FEASTS':
        return Images.lineup_pillar_feasts;
      case 'MUSIC':
        return Images.lineup_pillar_music;
      case 'TALKS & WORKSHOPS':
        return Images.lineup_pillar_talks;
      case 'WELLNESS':
        return Images.lineup_pillar_wellness;
    }

    return Images.lineup_pillar_arts;
  };
  static sectionTitle = program => ApiUtils.title(program).charAt(0);
  static sectionLocation = (date, sections) => {
    return sections.reduce(
      (sum, value, index, array) => {
        if (value.title === date) sum.sectionIndex = index;
        return sum;
      },
      {itemIndex: 0, sectionIndex: 0},
    );
  };

  static compareDate(a, b) {
    const titleA = ProgramViewModel.date(a);
    const titleB = ProgramViewModel.date(b);
    const compare = titleA ? titleA.localeCompare(titleB) : -1;

    return compare === 0 ? ProgramViewModel.compareTitle(a, b) : compare;
  }

  static comparePillar(a, b) {
    const titleA = ProgramViewModel.pillar(a);
    const titleB = ProgramViewModel.pillar(b);
    const compare = titleA ? titleA.localeCompare(titleB) : -1;

    return compare === 0 ? ProgramViewModel.compareTitle(a, b) : compare;
  }

  static compareScheduleDate(a, b) {
    const titleA = ProgramViewModel.dateSchedule(a);
    const titleB = ProgramViewModel.dateSchedule(b);
    return titleA ? titleA.localeCompare(titleB) : -1;
  }

  static compareTitle(a, b) {
    const titleA = ApiUtils.title(a);
    const titleB = ApiUtils.title(b);
    return titleA ? titleA.localeCompare(titleB) : -1;
  }

  /**
   * Parse Program Data and expand to Schedule list
   * @param data Program Data with schedules
   * @returns [] Program List
   */
  static parseActivity(data) {
    const schedules = ProgramViewModel.schedules(data);

    return schedules.map(schedule => ({...data, ...schedule}));
  }

  /**
   * Parse Lineup Data for ALL tab in LineupScreen
   * Program will Group by first character in title and sorted by title
   * @param data Program Data from Activities web service
   * @returns {*} SectionList data
   */
  static parseLineUp = data =>
    ApiUtils.toSectionList(ProgramViewModel.sectionTitle, data);

  /**
   * Parse Lineup Data for Single Program Screen
   * Program will be convert using id as index
   * @param data Program Data from Activities web service
   * @returns {*} Object with id as key
   */
  static parseLineUpLookup = data => ApiUtils.toLookupList(ApiUtils.id, data);

  /**
   * Parse Lineup Data for PILLARS tab in LineupScreen
   * Program will Group by pillar and sorted by title
   * @param data Program Data from Activities web service
   * @returns {*} SectionList data
   */
  static parseLineUpPillar = data =>
    ApiUtils.toSectionList(ProgramViewModel.pillar, data);

  /**
   * Parse My Schedules Data for My Schedules Screen
   * Program will Group by date and sorted by time and title
   * @param data My Schedules Lookup Data from WonderfruitRedux
   * @returns {any[]} SectionList data
   */
  static parseMySchedules = data => {
    const myschedules = Object.values(data)
      .sort(ProgramViewModel.compareDate)
      .map((value, index, array) => {
        return value.set(
          'displayTime',
          index === 0 ||
            ProgramViewModel.compareScheduleDate(array[index - 1], value) !== 0,
        );
      });
    return ProgramViewModel.parseProgram(myschedules);
  };

  /**
   * Parse Program Data for Program Screen
   * Program will Group by date and sorted by time and title
   * @param data Activities Data from ProgramViewModel.expandProgramActivity
   * @returns {any[]} SectionList data
   */
  static parseProgram = data =>
    ApiUtils.toSectionList(ProgramViewModel.sectionDate, data);

  /**
   * Parse Program Lookup for Program Screen
   * Program will be convert using schedule id as index
   * @param data Activities Data from ProgramViewModel.expandProgramActivity
   * @returns {*} Object with id as key
   */
  static parseProgramLookup = data =>
    ApiUtils.toLookupList(ScheduleViewModel.scheduleId, data);

  static expandProgramActivity(data) {
    if (!data) return [];

    let activities = [];
    data.forEach(activity => {
      activities.push(...ProgramViewModel.parseActivity(activity));
    });
    return activities
      .sort(ProgramViewModel.compareDate)
      .map((value, index, array) => {
        // modify for 1 hour ranges

        //           console.log(value)
        value.displayTime =
          index === 0 ||
          ProgramViewModel.compareScheduleDate(array[index - 1], value) !== 0;
        return value;
      });
  }
}
