# init example sets
EmployeeScores = [{"score": 50, "id": 0},{"score": 14, "id": 1},{"score": 13, "id": 2},{"score": 29, "id": 3},{"score": 79, "id": 4},{"score": 62, "id": 5},{"score": 97, "id": 6},{"score": 17, "id": 7},{"score": 78, "id": 8},{"score": 46, "id": 9},{"score": 3, "id": 10},{"score": 55, "id": 11},{"score": 64, "id": 12},{"score": 90, "id": 13},{"score": 49, "id": 14},{"score": 5, "id": 15},{"score": 2, "id": 16},{"score": 4, "id": 17},{"score": 76, "id": 18},{"score": 45, "id": 19},{"score": 39, "id": 20},{"score": 35, "id": 21},{"score": 82, "id": 22},{"score": 37, "id": 23},{"score": 96, "id": 24},{"score": 74, "id": 25},{"score": 25, "id": 26},{"score": 10, "id": 27},{"score": 28, "id": 28},{"score": 18, "id": 29},{"score": 23, "id": 30},{"score": 32, "id": 31},{"score": 92, "id": 32},{"score": 77, "id": 33},{"score": 11, "id": 34},{"score": 43, "id": 35},{"score": 48, "id": 36},{"score": 22, "id": 37},{"score": 47, "id": 38},{"score": 61, "id": 39},{"score": 65, "id": 40},{"score": 84, "id": 41},{"score": 57, "id": 42},{"score": 44, "id": 43},{"score": 73, "id": 44},{"score": 40, "id": 45},{"score": 6, "id": 46},{"score": 36, "id": 47},{"score": 16, "id": 48},{"score": 63, "id": 49}]
EmployerScores = [{"score": 50, "id": 0},{"score": 14, "id": 1},{"score": 13, "id": 2},{"score": 29, "id": 3},{"score": 79, "id": 4},{"score": 62, "id": 5},{"score": 97, "id": 6},{"score": 17, "id": 7},{"score": 78, "id": 8},{"score": 46, "id": 9},{"score": 3, "id": 10},{"score": 55, "id": 11},{"score": 64, "id": 12},{"score": 90, "id": 13},{"score": 49, "id": 14},{"score": 5, "id": 15},{"score": 2, "id": 16},{"score": 4, "id": 17},{"score": 76, "id": 18},{"score": 45, "id": 19},{"score": 39, "id": 20},{"score": 35, "id": 21},{"score": 82, "id": 22},{"score": 37, "id": 23},{"score": 96, "id": 24},{"score": 74, "id": 25},{"score": 25, "id": 26},{"score": 10, "id": 27},{"score": 28, "id": 28},{"score": 18, "id": 29},{"score": 23, "id": 30},{"score": 32, "id": 31},{"score": 92, "id": 32},{"score": 77, "id": 33},{"score": 11, "id": 34},{"score": 43, "id": 35},{"score": 48, "id": 36},{"score": 22, "id": 37},{"score": 47, "id": 38},{"score": 61, "id": 39},{"score": 65, "id": 40},{"score": 84, "id": 41},{"score": 57, "id": 42},{"score": 44, "id": 43},{"score": 73, "id": 44},{"score": 40, "id": 45},{"score": 6, "id": 46},{"score": 36, "id": 47},{"score": 16, "id": 48},{"score": 63, "id": 49}]

#sort sets
SortedEmployeeScores = sorted(EmployeeScores, key=lambda k: k["score"])
SortedEmployerScores = sorted(EmployerScores, key=lambda k: k["score"])

#match id's
for Index, Next in enumerate(SortedEmployeeScores):
	print SortedEmployeeScores[Index]["id"], SortedEmployerScores[Index]["id"]