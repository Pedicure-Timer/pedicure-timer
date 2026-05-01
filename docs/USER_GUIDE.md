# 📖 User Guide - Pedicure Timer & Queue Management

## 🎯 Overview

This application helps manage pedicure chair timers and manicure customer queues in real-time. It's designed for nail salons to efficiently track service times and assign customers to available technicians.

## 🚀 Quick Start

### 1. Starting a Pedicure Session
1. Find an **Idle** chair (gray badge)
2. Click the **Start** button
3. Timer begins automatically
4. Chair status changes to **Running** (blue badge)

### 2. Adding Customers to Queue
1. Locate the **Manicure Queue** panel on the right
2. Enter customer name in the text field
3. Click **Add** button
4. Customer appears in the queue with position number

### 3. Assigning Customers to Technicians
1. Technician marks themselves as **Ready** (green badge)
2. Next customer in queue is highlighted
3. Click **Assign to [Tech Name]** button
4. Customer is assigned to the ready technician

### 4. Completing a Session
- When timer finishes, chair status changes to **Finished** (amber badge)
- Sound alert plays (if enabled)
- Click **Reset** to make chair available again

## 📋 Interface Guide

### Top Bar
- **App Title**: Application name and subtitle
- **Active Chairs**: Number of chairs currently running
- **Queue**: Number of customers waiting
- **Language Switcher**: Toggle between EN/VI

### Pedicure Chairs Section
Each chair card shows:
- **Chair Number**: Identifier (1-4)
- **Status Badge**: Current state (Idle/Running/Finished)
- **Timer Display**: Countdown or ready state
- **Action Button**: Start or Reset
- **Technician**: Assigned tech (if any)

**Chair States:**
- 🟢 **Idle** (Gray): Available, ready to start
- 🔵 **Running** (Blue): Timer active, service in progress
- 🟠 **Finished** (Amber): Time's up, needs attention

### Manicure Techs Section
Each tech card shows:
- **Name**: Technician identifier
- **Status Badge**: Current availability
- **Ready Button**: Mark as available (when busy)

**Tech States:**
- ⚪ **Busy** (Gray): Not available
- 🟢 **Ready** (Green): Available for assignment
- 🟣 **Assigned** (Purple): Currently working

### Queue Panel
- **Customer List**: Shows all waiting customers with position numbers
- **Next Badge**: Highlights the next customer to be assigned
- **Add Form**: Input field to add new customers
- **Assign Button**: Appears when tech is ready

### Demo Controls
- **Demo Mode Toggle**: Switch between demo (40s/70s) and full timers
- **Reset All Button**: Clear all data (requires confirmation)

### Quick Guide
Built-in step-by-step instructions in the sidebar:
1. Start chair timer
2. Add customers to queue
3. Techs mark ready
4. Assign customers

## 🎨 Visual Indicators

### Colors
- **Blue**: Active/Running states
- **Green**: Ready/Available states
- **Amber**: Alerts/Finished states
- **Purple**: Queue/Assigned states
- **Red**: Destructive actions
- **Gray**: Idle/Neutral states

### Icons
- 🪑 **Armchair**: Pedicure chairs
- 👥 **Users**: Queue and technicians
- ⏰ **Clock**: Timer display
- ▶️ **Play**: Start action
- 🔄 **Rotate**: Reset action
- ➕ **Plus**: Add action
- ✓ **Check**: Ready/Complete
- ⚙️ **Settings**: Controls
- 🔔 **Bell**: Sound alerts

## ⚡ Keyboard Shortcuts

Currently, the app is optimized for touch/mouse interaction. Keyboard navigation follows standard web patterns:
- **Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons
- **Esc**: Close dialogs

## 🔊 Sound Alerts

### Enabling Sound
1. Click **Enable Sound** in the yellow banner at the top
2. Browser will request permission
3. Sound alerts will play when timers finish

### When Alerts Play
- Timer reaches 00:00
- Chair status changes to Finished
- Helps staff notice completed sessions

## ⚙️ Settings

### Demo Mode
**Purpose**: Quick testing with shorter timers
- **Off**: Full pedicure timer (70 minutes)
- **On**: Demo timers (40 seconds)

**Use Cases:**
- Testing the application
- Training new staff
- Demonstrations

### Reset All
**Warning**: This action cannot be undone!

Resets:
- All chair timers to idle
- All tech statuses to busy
- Entire customer queue
- Demo mode setting

## 📱 Mobile Usage

The app is fully responsive and works on:
- **Desktop**: Full 3-column layout
- **Tablet**: 2-column layout
- **Mobile**: Single column, stacked sections

### Mobile Tips
- Scroll vertically to see all sections
- Stats hidden on small screens (check top bar)
- All touch targets are 44px minimum
- Swipe-friendly interface

## 🌐 Language Support

### Switching Languages
1. Click language button in top right (EN/VI)
2. Interface updates immediately
3. Preference is saved locally

### Supported Languages
- **English (EN)**: Full interface
- **Vietnamese (VI)**: Full interface

## 💾 Data Persistence

### What's Saved
- Chair states and timers
- Tech statuses
- Customer queue
- Demo mode setting
- Sound preference
- Language preference

### Where It's Saved
- Browser local storage
- Data persists across sessions
- Cleared when browser data is cleared

## 🔧 Troubleshooting

### Timer Not Starting
- Check if chair is in Idle state
- Refresh the page
- Check browser console for errors

### Sound Not Playing
- Ensure sound is enabled (yellow banner)
- Check browser sound permissions
- Verify device volume is up
- Try clicking Enable Sound again

### Queue Not Updating
- Refresh the page
- Check browser console
- Verify local storage is enabled

### Data Lost
- Check if browser data was cleared
- Verify local storage is enabled
- Data is stored per browser/device

## 🎯 Best Practices

### For Receptionists
1. Add customers to queue as they arrive
2. Keep customer names clear and identifiable
3. Monitor queue length in top bar
4. Assign customers promptly when techs are ready

### For Technicians
1. Mark yourself ready immediately when available
2. Check your status badge regularly
3. Notify reception if status is incorrect

### For Managers
1. Monitor active chairs count
2. Use demo mode for training
3. Reset all at end of day if needed
4. Enable sound alerts for better awareness

## 📊 Workflow Example

### Typical Session Flow

**9:00 AM - Customer Arrives for Pedicure**
1. Receptionist starts Chair 1 timer
2. Customer begins service

**9:30 AM - Customer Arrives for Manicure**
1. Receptionist adds "Jane Doe" to queue
2. Customer waits (position #1)

**9:35 AM - Tech Becomes Available**
1. Tech clicks "I'm Ready" button
2. Status changes to Ready (green)

**9:35 AM - Assignment**
1. Receptionist clicks "Assign to [Tech Name]"
2. Jane Doe is assigned
3. Tech status changes to Assigned (purple)

**10:10 AM - Pedicure Complete**
1. Chair 1 timer reaches 00:00
2. Sound alert plays
3. Status changes to Finished (amber)
4. Receptionist clicks Reset
5. Chair 1 becomes Idle again

## 🆘 Support

### Getting Help
- Check this guide first
- Review the Quick Guide in the sidebar
- Check browser console for errors
- Contact your system administrator

### Reporting Issues
When reporting problems, include:
- Browser name and version
- Device type (desktop/tablet/mobile)
- Steps to reproduce
- Screenshot if possible
- Error messages from console

## 🔄 Updates

The application may receive updates for:
- New features
- Bug fixes
- Performance improvements
- UI enhancements

Refresh your browser to get the latest version.

---

**Version**: 2.0  
**Last Updated**: 2026-05-02  
**Design**: Modern, Minimalist, Professional
