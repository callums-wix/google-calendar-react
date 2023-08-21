// import * as util from './utils';
// import { vi } from 'vitest';

// describe('Test outside click function:', () => {
//   let dialogMock = {
//     getBoundingClientRect: vi.fn(() => ({
//       left: 100,
//       right: 200,
//       top: 100,
//       bottom: 200,
//     })),
//   } as unknown as HTMLElement;

//   it('Should fire callback if click is outside of element', () => {
//     let callback = vi.fn();
//     const clickMock = {
//       clientX: 50,
//       clientY: 50,
//     } as unknown as MouseEvent;
//     util.onOutsideClick(dialogMock, clickMock, callback);
//     expect(callback).toHaveBeenCalled();
//   });
//   it('Should not fire callback if click is outside of element', () => {
//     let callback = vi.fn();
//     const clickMock = {
//       clientX: 150,
//       clientY: 150,
//     } as unknown as MouseEvent;
//     util.onOutsideClick(dialogMock, clickMock, callback);
//     expect(callback).not.toHaveBeenCalled();
//   });
// });

// describe('Test createDayId function:', () => {
//   it('Should return correct formatted string', () => {
//     const date = new Date('2023-08-07');
//     const dayId = util.createDayId(date);
//     expect(dayId).toEqual('Mon-Aug-07-2023');
//   });
// });

// describe('Test changeDateByDays function:', () => {
//   const date = new Date('01-10-2000');
//   it('Should change date forward', () => {
//     const change = 7;
//     const newDate = util.changeDateByDays(date, change);
//     expect(newDate.getDate()).toBe(date.getDate() + change);
//   });
//   it('Should change date backwards', () => {
//     const change = -7;
//     const newDate = util.changeDateByDays(date, change);
//     expect(newDate.getDate()).toBe(date.getDate() + change);
//   });
//   it('Should not unexpectedly alter month/year', () => {
//     const change = 7;
//     const newDate = util.changeDateByDays(date, change);
//     expect(newDate.getMonth()).toBe(date.getMonth());
//   });
//   it('Should change month/year when needed', () => {
//     const change = 10;
//     const endOfYear = new Date('12-31-2000');
//     const newDate = util.changeDateByDays(endOfYear, change);
//     expect(newDate.getMonth()).toBe(0);
//     expect(newDate.getFullYear()).toBe(2001);
//   });
// });

// describe('Test createWeekDates function:', () => {
//   it('Should only contain 7 days', () => {
//     const date = new Date();
//     const weekDates = util.createWeekDates(date);
//     expect(weekDates).toHaveLength(7);
//   });
//   it('Should return list of 7 consecutive dates', () => {
//     const date = new Date('2023-08-06');
//     const weekDates = util.createWeekDates(date);
//     const expectedDates = [
//       new Date('2023-08-06'),
//       new Date('2023-08-07'),
//       new Date('2023-08-08'),
//       new Date('2023-08-09'),
//       new Date('2023-08-10'),
//       new Date('2023-08-11'),
//       new Date('2023-08-12'),
//     ];
//     expect(weekDates).toEqual(expectedDates);
//   });
//   it('Should corectly back fill dates', () => {
//     const date = new Date('2023-08-12');
//     const weekDates = util.createWeekDates(date);
//     const expectedDates = [
//       new Date('2023-08-06'),
//       new Date('2023-08-07'),
//       new Date('2023-08-08'),
//       new Date('2023-08-09'),
//       new Date('2023-08-10'),
//       new Date('2023-08-11'),
//       new Date('2023-08-12'),
//     ];
//     expect(weekDates).toEqual(expectedDates);
//   });
//   it('Should cross over months', () => {
//     const date = new Date('2023-07-30');
//     const weekDates = util.createWeekDates(date);
//     const expectedDates = [
//       new Date('2023-07-30'),
//       new Date('2023-07-31'),
//       new Date('2023-08-01'),
//       new Date('2023-08-02'),
//       new Date('2023-08-03'),
//       new Date('2023-08-04'),
//       new Date('2023-08-05'),
//     ];
//     expect(weekDates).toEqual(expectedDates);
//   });
// });

// describe('Test overlappingMonths function:', () => {
//   it('Should return null if week is contained in a single month', () => {
//     const date = new Date('2023-07-15');
//     const res = util.overlappingMonths(date);
//     expect(res).toBeNull();
//   });
//   it('Should return formated string if week straddles 2 months', () => {
//     const date = new Date('2023-07-30');
//     const res = util.overlappingMonths(date);
//     expect(res).toEqual('Jul-Aug');
//   });
// });

// describe(util.positionElement, () => {
//   const blockHeight = 48;
//   let element: HTMLElement, startDate: string, endDate: string;
//   beforeEach(() => {
//     element = document.createElement('div');
//     startDate = '2023-08-08T10:30';
//     endDate = '2023-08-08T12:30';
//   });
//   it('Should correctly set top position on element.', () => {
//     util.positionElement(element, startDate, endDate, blockHeight);
//     expect(element.style.top).toBe(`${blockHeight * 10.5}px`);
//   });
//   it('Should correctly set height of element', () => {
//     util.positionElement(element, startDate, endDate, blockHeight);
//     expect(element.style.height).toBe(`${2 * blockHeight}px`);
//   });
// });
